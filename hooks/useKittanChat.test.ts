import { createRequire } from 'node:module';
import { afterEach, describe, expect, test, vi } from 'vite-plus/test';
import { DEFAULT_KITTAN_PAGE } from '../lib/kittan/pageContext';
import type { ChatMessage } from '../lib/kittan/types';
import { useKittanChat } from './useKittanChat';

/**
 * `vp test` はグローバルインストールされたランナーを起動するため、docblock で jsdom 環境を
 * 指定してもランナー側から jsdom パッケージを解決できません(依存はプロジェクト側にしか無い)。
 * そのためこのファイルだけ DOM を自前で用意します。
 * jsdom はプロジェクト側の依存なのでテストファイルからは読み込めます
 * (型定義パッケージを増やさないよう createRequire 経由で読みます)。
 */
type JsdomModule = {
  JSDOM: new (html: string, options: { url: string }) => { window: object };
};

const setUpDom = (): void => {
  const { JSDOM } = createRequire(import.meta.url)('jsdom') as JsdomModule;
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost/',
  });
  const win = dom.window as unknown as Record<string, unknown>;
  const target = globalThis as unknown as Record<string, unknown>;
  const define = (key: string, value: unknown) => {
    Object.defineProperty(target, key, { value, configurable: true, writable: true });
  };

  define('window', win);
  define('document', win.document);
  for (const key of Object.getOwnPropertyNames(win)) {
    if (key in target) {
      continue;
    }
    define(key, Reflect.get(win, key, win));
  }
};

// react-dom がモジュール評価時に document を参照するため、import より前に DOM を用意します。
setUpDom();
const { act, renderHook } = await import('@testing-library/react');

/** フックが参照するのは status / json() / headers.get() だけなので簡易スタブで足りる。 */
type FetchResponse = {
  status: number;
  json: () => Promise<unknown>;
  headers: { get: (name: string) => string | null };
};

type FetchInit = { method: string; headers: Record<string, string>; body: string };

const jsonResponse = (
  status: number,
  body: unknown,
  headers: Record<string, string> = {},
): FetchResponse => ({
  status,
  json: () => Promise.resolve(body),
  headers: { get: (name) => headers[name.toLowerCase()] ?? null },
});

const createFetchMock = () => {
  const fetchMock = vi.fn<(input: string, init: FetchInit) => Promise<FetchResponse>>();
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
};

const sentMessages = (init: FetchInit): ChatMessage[] =>
  (JSON.parse(init.body) as { messages: ChatMessage[] }).messages;

const sentPage = (init: FetchInit): string | undefined =>
  (JSON.parse(init.body) as { page?: string }).page;

const lastCall = (fetchMock: ReturnType<typeof createFetchMock>): FetchInit => {
  const call = fetchMock.mock.calls.at(-1);
  if (call === undefined) {
    throw new Error('fetch が呼ばれていません');
  }
  return call[1];
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('useKittanChat', () => {
  test('成功したら user と assistant が履歴に積まれる', async () => {
    const fetchMock = createFetchMock();
    fetchMock.mockResolvedValue(jsonResponse(200, { reply: 'やっほー🐈' }));

    const { result } = renderHook(() => useKittanChat());
    await act(async () => {
      await result.current.send('  はじめまして！  ');
    });

    expect(result.current.messages).toEqual([
      { role: 'user', content: 'はじめまして！' },
      { role: 'assistant', content: 'やっほー🐈' },
    ]);
    expect(result.current.status).toBe('idle');
    expect(result.current.error).toBeNull();
    expect(sentMessages(lastCall(fetchMock))).toEqual([
      { role: 'user', content: 'はじめまして！' },
    ]);
  });

  test('引数のページをリクエストに載せる', async () => {
    const fetchMock = createFetchMock();
    fetchMock.mockResolvedValue(jsonResponse(200, { reply: 'TrainLCDはね〜🚃' }));

    const { result } = renderHook(() => useKittanChat('trainlcd'));
    await act(async () => {
      await result.current.send('TrainLCDってなに？');
    });

    expect(sentPage(lastCall(fetchMock))).toBe('trainlcd');
  });

  test('ページを省略すると既定のページを載せる', async () => {
    const fetchMock = createFetchMock();
    fetchMock.mockResolvedValue(jsonResponse(200, { reply: 'やっほー🐈' }));

    const { result } = renderHook(() => useKittanChat());
    await act(async () => {
      await result.current.send('やっほー');
    });

    expect(sentPage(lastCall(fetchMock))).toBe(DEFAULT_KITTAN_PAGE);
  });

  test('空文字は送信しない', async () => {
    const fetchMock = createFetchMock();

    const { result } = renderHook(() => useKittanChat());
    await act(async () => {
      await result.current.send('   ');
    });

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.current.messages).toEqual([]);
  });

  test('blocked_content はエラーにせず、きったんの発言として積む', async () => {
    const fetchMock = createFetchMock();
    fetchMock.mockResolvedValue(
      jsonResponse(400, {
        error: { code: 'blocked_content', message: 'ごめんね、その話題にはお答えできないんだ🙏' },
      }),
    );

    const { result } = renderHook(() => useKittanChat());
    await act(async () => {
      await result.current.send('あぶない話');
    });

    expect(result.current.error).toBeNull();
    expect(result.current.messages).toEqual([
      { role: 'user', content: 'あぶない話' },
      { role: 'assistant', content: 'ごめんね、その話題にはお答えできないんだ🙏' },
    ]);
  });

  test('invalid_request は再試行不可のエラーにする', async () => {
    const fetchMock = createFetchMock();
    fetchMock.mockResolvedValue(
      jsonResponse(400, {
        error: { code: 'invalid_request', message: 'メッセージの形式が正しくありません。' },
      }),
    );

    const { result } = renderHook(() => useKittanChat());
    await act(async () => {
      await result.current.send('こんにちは');
    });

    expect(result.current.error).toEqual({
      message: 'メッセージの形式が正しくありません。',
      retryable: false,
    });
    expect(result.current.messages).toEqual([{ role: 'user', content: 'こんにちは' }]);
  });

  test('429 は retry-after から retryAt を計算する', async () => {
    const now = 1_700_000_000_000;
    vi.spyOn(Date, 'now').mockReturnValue(now);

    const fetchMock = createFetchMock();
    fetchMock.mockResolvedValue(
      jsonResponse(
        429,
        { error: { code: 'rate_limited', message: 'ペースが速すぎるかも！' } },
        { 'retry-after': '30' },
      ),
    );

    const { result } = renderHook(() => useKittanChat());
    await act(async () => {
      await result.current.send('こんにちは');
    });

    expect(result.current.error).toEqual({
      message: 'ペースが速すぎるかも！',
      retryable: true,
      retryAt: now + 30_000,
    });
  });

  test('429 で retry-after が無ければ retryAt は付かない', async () => {
    const fetchMock = createFetchMock();
    fetchMock.mockResolvedValue(
      jsonResponse(429, { error: { code: 'rate_limited', message: '待ってね' } }),
    );

    const { result } = renderHook(() => useKittanChat());
    await act(async () => {
      await result.current.send('こんにちは');
    });

    expect(result.current.error?.retryAt).toBeUndefined();
    expect(result.current.error?.retryable).toBe(true);
  });

  test('500 のあと retry すると同じ内容で再送し、成功でエラーが消える', async () => {
    const fetchMock = createFetchMock();
    fetchMock.mockResolvedValueOnce(
      jsonResponse(500, {
        error: { code: 'server_error', message: 'うまくお返事できませんでした' },
      }),
    );

    const { result } = renderHook(() => useKittanChat());
    await act(async () => {
      await result.current.send('やっほー');
    });

    expect(result.current.error).toEqual({
      message: 'うまくお返事できませんでした',
      retryable: true,
    });
    expect(result.current.messages).toEqual([{ role: 'user', content: 'やっほー' }]);
    const firstPayload = lastCall(fetchMock).body;

    fetchMock.mockResolvedValueOnce(jsonResponse(200, { reply: 'おまたせ🐈' }));
    await act(async () => {
      await result.current.retry();
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(lastCall(fetchMock).body).toBe(firstPayload);
    expect(result.current.error).toBeNull();
    expect(result.current.messages).toEqual([
      { role: 'user', content: 'やっほー' },
      { role: 'assistant', content: 'おまたせ🐈' },
    ]);
  });

  test('retryable でないエラーでは retry しない', async () => {
    const fetchMock = createFetchMock();
    fetchMock.mockResolvedValue(
      jsonResponse(400, { error: { code: 'invalid_request', message: 'だめ' } }),
    );

    const { result } = renderHook(() => useKittanChat());
    await act(async () => {
      await result.current.send('こんにちは');
    });
    await act(async () => {
      await result.current.retry();
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test('ネットワークエラーは定型文 + 再試行可', async () => {
    const fetchMock = createFetchMock();
    fetchMock.mockRejectedValue(new Error('offline'));

    const { result } = renderHook(() => useKittanChat());
    await act(async () => {
      await result.current.send('こんにちは');
    });

    expect(result.current.error).toEqual({
      message: '通信がうまくいかなかったみたい。もう一度試してみてね🙏',
      retryable: true,
    });
    expect(result.current.status).toBe('idle');
    expect(result.current.messages).toEqual([{ role: 'user', content: 'こんにちは' }]);
  });

  test('20件を超える履歴は先頭から2件単位で削って送る', async () => {
    const fetchMock = createFetchMock();
    fetchMock.mockImplementation(() => Promise.resolve(jsonResponse(200, { reply: 'ok' })));

    const { result } = renderHook(() => useKittanChat());
    for (let index = 0; index < 10; index += 1) {
      await act(async () => {
        await result.current.send(`しつもん${index}`);
      });
    }
    expect(result.current.messages).toHaveLength(20);

    await act(async () => {
      await result.current.send('さいごのしつもん');
    });

    const payload = sentMessages(lastCall(fetchMock));
    expect(payload.length).toBeLessThanOrEqual(20);
    expect(payload).toHaveLength(19);
    expect(payload[0]?.role).toBe('user');
    expect(payload.at(-1)).toEqual({ role: 'user', content: 'さいごのしつもん' });
    for (const [index, message] of payload.entries()) {
      expect(message.role).toBe(index % 2 === 0 ? 'user' : 'assistant');
    }
    // 最古の2件は送信ペイロードからだけ落ちて、表示履歴には残る。
    expect(payload[0]).toEqual({ role: 'user', content: 'しつもん1' });
    expect(result.current.messages).toHaveLength(22);
  });

  test('送信中の send は無視される', async () => {
    const fetchMock = createFetchMock();
    let resolveFetch: ((response: FetchResponse) => void) | undefined;
    fetchMock.mockImplementation(
      () =>
        new Promise<FetchResponse>((resolve) => {
          resolveFetch = resolve;
        }),
    );

    const { result } = renderHook(() => useKittanChat());
    await act(async () => {
      void result.current.send('いちど目');
      void result.current.send('にど目');
      await Promise.resolve();
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(result.current.status).toBe('sending');

    await act(async () => {
      resolveFetch?.(jsonResponse(200, { reply: 'ok' }));
      await Promise.resolve();
    });
    expect(result.current.messages).toEqual([
      { role: 'user', content: 'いちど目' },
      { role: 'assistant', content: 'ok' },
    ]);
  });

  test('reset で履歴とエラーが初期化される', async () => {
    const fetchMock = createFetchMock();
    fetchMock.mockResolvedValue(
      jsonResponse(500, { error: { code: 'server_error', message: 'しっぱい' } }),
    );

    const { result } = renderHook(() => useKittanChat());
    await act(async () => {
      await result.current.send('こんにちは');
    });
    expect(result.current.error).not.toBeNull();

    act(() => {
      result.current.reset();
    });

    expect(result.current.messages).toEqual([]);
    expect(result.current.error).toBeNull();
    expect(result.current.status).toBe('idle');
  });

  test('送信中に reset すると遅れて届いた返答は捨てられる', async () => {
    const fetchMock = createFetchMock();
    let resolveFetch: ((response: FetchResponse) => void) | undefined;
    fetchMock.mockImplementation(
      () =>
        new Promise<FetchResponse>((resolve) => {
          resolveFetch = resolve;
        }),
    );

    const { result } = renderHook(() => useKittanChat());
    await act(async () => {
      void result.current.send('こんにちは');
      await Promise.resolve();
    });

    act(() => {
      result.current.reset();
    });

    await act(async () => {
      resolveFetch?.(jsonResponse(200, { reply: 'おそいへんじ' }));
      await Promise.resolve();
    });

    expect(result.current.messages).toEqual([]);
    expect(result.current.status).toBe('idle');
  });
});
