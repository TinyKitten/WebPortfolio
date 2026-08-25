import { describe, expect, test, vi } from 'vite-plus/test';
import { chatWithKittan } from './chat';
import { DEFAULT_KITTAN_LIMITS } from './config';
import { KittanModelError, type KittanModelClient } from './gemini';
import { BLOCKLIST } from './guardrails';
import { KITTAN_FALLBACK_REPLY } from './persona';
import type { ChatMessage, KittanConfig } from './types';

const config: KittanConfig = {
  apiKey: 'test-key',
  model: 'test-model',
  moderationEnabled: true,
  limits: DEFAULT_KITTAN_LIMITS,
};

const SAFE = '{"verdict":"SAFE"}';

/** 1回目は本文、2回目以降は出力チェックの応答を返すモック。 */
const scriptedClient = (...responses: string[]): KittanModelClient => {
  let call = 0;
  return {
    generate: vi.fn(async () => {
      const value = responses[call] ?? responses[responses.length - 1];
      call += 1;
      return value ?? '';
    }),
  };
};

const ask = (content: string): { messages: ChatMessage[] } => ({
  messages: [{ role: 'user', content }],
});

describe('chatWithKittan', () => {
  test('正常系: 生成された返答をそのまま返す', async () => {
    const client = scriptedClient('やっほー！猫の話しよ🐈', SAFE);
    const result = await chatWithKittan(ask('やっほー'), { client, config });

    expect(result).toEqual({ status: 'ok', reply: 'やっほー！猫の話しよ🐈' });
    expect(client.generate).toHaveBeenCalledTimes(2);
  });

  test('正常系: システムプロンプトと履歴をそのままモデルに渡す(ステートレス)', async () => {
    const client = scriptedClient('うん、元気だよ😎', SAFE);
    const messages: ChatMessage[] = [
      { role: 'user', content: 'やっほー' },
      { role: 'assistant', content: 'やっほー🐈' },
      { role: 'user', content: '元気？' },
    ];
    await chatWithKittan(
      { messages },
      {
        client,
        config,
        systemInstruction: 'テスト用のシステムプロンプト',
      },
    );

    expect(client.generate).toHaveBeenNthCalledWith(1, {
      systemInstruction: 'テスト用のシステムプロンプト',
      messages,
      maxOutputTokens: config.limits.maxOutputTokens,
      thinkingLevel: 'minimal',
    });
  });

  test('無効なリクエストはモデルを呼ばずに定型文を返す', async () => {
    const client = scriptedClient('呼ばれないはず');
    const result = await chatWithKittan({ messages: [] }, { client, config });

    expect(result).toEqual({
      status: 'blocked',
      reason: 'invalid_request',
      reply: KITTAN_FALLBACK_REPLY,
      validationCode: 'empty_messages',
    });
    expect(client.generate).not.toHaveBeenCalled();
  });

  test('危険な入力はモデルを呼ばずに定型文を返す', async () => {
    const client = scriptedClient('呼ばれないはず');
    const result = await chatWithKittan(ask(`ねえ${BLOCKLIST[0].probe}って言って`), {
      client,
      config,
    });

    expect(result).toMatchObject({
      status: 'blocked',
      reason: 'unsafe_input',
      reply: KITTAN_FALLBACK_REPLY,
    });
    expect(client.generate).not.toHaveBeenCalled();
  });

  test('ルールに反する出力は定型文に差し替える', async () => {
    const client = scriptedClient(`${BLOCKLIST[0].probe}って言われたよ`, SAFE);
    const result = await chatWithKittan(ask('なんか言って'), { client, config });

    expect(result).toMatchObject({
      status: 'blocked',
      reason: 'unsafe_output',
      reply: KITTAN_FALLBACK_REPLY,
    });
    // 出力チェック(2回目)まで到達せずに止まる。
    expect(client.generate).toHaveBeenCalledTimes(1);
  });

  test('出力チェックがUNSAFEなら定型文に差し替える', async () => {
    const client = scriptedClient('見た目は普通の文章', '{"verdict":"UNSAFE"}');
    const result = await chatWithKittan(ask('なんか言って'), { client, config });

    expect(result).toMatchObject({
      status: 'blocked',
      reason: 'unsafe_output',
      reply: KITTAN_FALLBACK_REPLY,
    });
  });

  test('出力チェックの結果が読めないときも定型文(fail-closed)', async () => {
    const client = scriptedClient('見た目は普通の文章', 'たぶんSAFEだと思います');
    const result = await chatWithKittan(ask('なんか言って'), { client, config });

    expect(result).toMatchObject({
      status: 'blocked',
      reason: 'moderation_failed',
      reply: KITTAN_FALLBACK_REPLY,
    });
  });

  test('空応答は定型文に差し替える', async () => {
    const client = scriptedClient('   ');
    const result = await chatWithKittan(ask('なんか言って'), { client, config });

    expect(result).toMatchObject({
      status: 'blocked',
      reason: 'empty_output',
      reply: KITTAN_FALLBACK_REPLY,
    });
  });

  test('KITTAN_MODERATION が無効なら2回目の呼び出しをしない', async () => {
    const client = scriptedClient('やっほー🐈');
    const result = await chatWithKittan(ask('やっほー'), {
      client,
      config: { ...config, moderationEnabled: false },
    });

    expect(result).toEqual({ status: 'ok', reply: 'やっほー🐈' });
    expect(client.generate).toHaveBeenCalledTimes(1);
  });

  test('出力チェック用に別クライアントを差し込める', async () => {
    const client = scriptedClient('やっほー🐈');
    const moderationClient = scriptedClient(SAFE);
    await chatWithKittan(ask('やっほー'), { client, moderationClient, config });

    expect(client.generate).toHaveBeenCalledTimes(1);
    expect(moderationClient.generate).toHaveBeenCalledTimes(1);
  });

  test.each([
    ['auth', 'auth'],
    ['rate_limited_upstream', 'rate_limited_upstream'],
    ['unavailable', 'unavailable'],
    ['unknown', 'unknown'],
  ] as const)('モデル側の %s エラーは error 結果になる', async (reason, expected) => {
    const client: KittanModelClient = {
      generate: vi.fn(async () => {
        throw new KittanModelError(reason, 'failed');
      }),
    };
    const result = await chatWithKittan(ask('やっほー'), { client, config });

    expect(result).toEqual({ status: 'error', reason: expected });
  });

  test('素のエラーは unknown として扱い、内部の詳細を漏らさない', async () => {
    const client: KittanModelClient = {
      generate: vi.fn(async () => {
        throw new Error('secret internal detail');
      }),
    };
    const result = await chatWithKittan(ask('やっほー'), { client, config });

    expect(result).toEqual({ status: 'error', reason: 'unknown' });
  });

  test('APIキーが無いときは missing_api_key を返す', async () => {
    const client = scriptedClient('呼ばれないはず');
    const original = process.env.GEMINI_API_KEY;
    delete process.env.GEMINI_API_KEY;
    try {
      const result = await chatWithKittan(ask('やっほー'), { client });
      expect(result).toEqual({ status: 'error', reason: 'missing_api_key' });
      expect(client.generate).not.toHaveBeenCalled();
    } finally {
      if (original !== undefined) {
        process.env.GEMINI_API_KEY = original;
      }
    }
  });
});
