import { afterEach, beforeEach, describe, expect, test, vi } from 'vite-plus/test';
import type { ChatResult } from '../../../../lib/kittan/types';

const chatWithKittan = vi.fn<(request: unknown) => Promise<ChatResult>>();

vi.mock('../../../../lib/kittan/chat', () => ({ chatWithKittan }));

const { POST, resolveClientKey } = await import('../route');

let ipCounter = 0;

/** テストごとに別IPを使い、モジュール内で共有されるレートリミッターを避けます。 */
const nextIp = (): string => {
  ipCounter += 1;
  return `203.0.113.${ipCounter}`;
};

const post = (body: unknown, ip: string, rawBody?: string): Promise<Response> =>
  POST(
    new Request('https://example.test/api/kittan-chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
      body: rawBody ?? JSON.stringify(body),
    }),
  );

beforeEach(() => {
  chatWithKittan.mockReset();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('resolveClientKey', () => {
  test('x-forwarded-for の先頭を使う', () => {
    const request = new Request('https://example.test', {
      headers: { 'x-forwarded-for': '198.51.100.7, 10.0.0.1, 10.0.0.2' },
    });
    expect(resolveClientKey(request)).toBe('198.51.100.7');
  });

  test('x-forwarded-for が無ければ x-real-ip', () => {
    const request = new Request('https://example.test', {
      headers: { 'x-real-ip': '198.51.100.8' },
    });
    expect(resolveClientKey(request)).toBe('198.51.100.8');
  });

  test('どちらも無ければ unknown', () => {
    expect(resolveClientKey(new Request('https://example.test'))).toBe('unknown');
  });
});

describe('POST /api/kittan-chat', () => {
  test('正常系は 200 と reply を返す', async () => {
    chatWithKittan.mockResolvedValue({ status: 'ok', reply: 'やっほー🐈' });

    const response = await post({ messages: [{ role: 'user', content: 'やっほー' }] }, nextIp());

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('application/json');
    await expect(response.json()).resolves.toEqual({ reply: 'やっほー🐈' });
  });

  test('壊れたJSONは 400', async () => {
    const response = await post(undefined, nextIp(), '{ not json');

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: { code: 'invalid_json', message: expect.any(String) },
    });
    expect(chatWithKittan).not.toHaveBeenCalled();
  });

  test('バリデーションで弾かれたら 400 invalid_request', async () => {
    chatWithKittan.mockResolvedValue({
      status: 'blocked',
      reason: 'invalid_request',
      reply: 'ごめんね',
      validationCode: 'empty_messages',
    });

    const response = await post({ messages: [] }, nextIp());

    expect(response.status).toBe(400);
    const body = (await response.json()) as { error: { code: string } };
    expect(body.error.code).toBe('invalid_request');
  });

  test('内容ブロック時は 400 blocked_content で定型文だけを返す', async () => {
    chatWithKittan.mockResolvedValue({
      status: 'blocked',
      reason: 'unsafe_output',
      reply: 'ごめんね、その話題にはお答えできないんだ🙏',
    });

    const response = await post(
      { messages: [{ role: 'user', content: 'なんか言って' }] },
      nextIp(),
    );

    expect(response.status).toBe(400);
    const body = (await response.json()) as {
      error: { code: string; message: string };
    };
    expect(body.error.code).toBe('blocked_content');
    expect(body.error.message).toBe('ごめんね、その話題にはお答えできないんだ🙏');
    // 内部の判定理由は漏らさない。
    expect(JSON.stringify(body)).not.toContain('unsafe_output');
  });

  test.each([
    ['rate_limited_upstream', 503, 'service_unavailable'],
    ['unavailable', 503, 'service_unavailable'],
    ['auth', 500, 'server_error'],
    ['missing_api_key', 500, 'server_error'],
    ['unknown', 500, 'server_error'],
  ] as const)('error(%s) は %s を返す', async (reason, status, code) => {
    chatWithKittan.mockResolvedValue({ status: 'error', reason });

    const response = await post({ messages: [{ role: 'user', content: 'やっほー' }] }, nextIp());

    expect(response.status).toBe(status);
    const body = (await response.json()) as {
      error: { code: string; message: string };
    };
    expect(body.error.code).toBe(code);
    // ユーザー向けメッセージに内部の理由コードは出さない。
    expect(body.error.message).not.toContain(reason);
  });

  test('同一IPからの連投は 429 になり、Retry-After が付く', async () => {
    chatWithKittan.mockResolvedValue({ status: 'ok', reply: 'やっほー🐈' });
    const ip = nextIp();
    const body = { messages: [{ role: 'user', content: 'やっほー' }] };

    for (let index = 0; index < 10; index += 1) {
      expect((await post(body, ip)).status).toBe(200);
    }

    const response = await post(body, ip);
    expect(response.status).toBe(429);
    expect(Number(response.headers.get('retry-after'))).toBeGreaterThan(0);
    const json = (await response.json()) as { error: { code: string } };
    expect(json.error.code).toBe('rate_limited');
    // 上限に達したあとはチャット本体を呼ばない。
    expect(chatWithKittan).toHaveBeenCalledTimes(10);
  });

  test('レートリミットはIPごとに独立している', async () => {
    chatWithKittan.mockResolvedValue({ status: 'ok', reply: 'やっほー🐈' });
    const body = { messages: [{ role: 'user', content: 'やっほー' }] };
    const ip = nextIp();

    for (let index = 0; index < 10; index += 1) {
      await post(body, ip);
    }
    expect((await post(body, ip)).status).toBe(429);
    expect((await post(body, nextIp())).status).toBe(200);
  });
});
