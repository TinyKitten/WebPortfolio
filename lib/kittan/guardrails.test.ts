import { describe, expect, test, vi } from 'vite-plus/test';
import { DEFAULT_KITTAN_LIMITS } from './config';
import type { KittanModelClient } from './gemini';
import {
  BLOCKLIST,
  moderateOutput,
  parseModerationVerdict,
  screenMessages,
  screenText,
  validateChatRequest,
} from './guardrails';
import type { ChatMessage, KittanConfig } from './types';

const limits = DEFAULT_KITTAN_LIMITS;

const userMessage = (content: string): ChatMessage => ({ role: 'user', content });

describe('validateChatRequest', () => {
  test('正しいリクエストを受け入れて内容をtrimする', () => {
    const result = validateChatRequest(
      { messages: [{ role: 'user', content: '  こんにちは  ' }] },
      limits,
    );
    expect(result).toEqual({
      ok: true,
      messages: [{ role: 'user', content: 'こんにちは' }],
    });
  });

  test('user / assistant が交互に並ぶ履歴を受け入れる', () => {
    const result = validateChatRequest(
      {
        messages: [
          { role: 'user', content: 'やっほー' },
          { role: 'assistant', content: 'やっほー🐈' },
          { role: 'user', content: '元気？' },
        ],
      },
      limits,
    );
    expect(result.ok).toBe(true);
  });

  test.each([
    ['本体がオブジェクトでない', 'invalid_body', 'not an object'],
    ['messagesが無い', 'invalid_body', {}],
    ['messagesが配列でない', 'invalid_body', { messages: 'hi' }],
    ['messagesが空', 'empty_messages', { messages: [] }],
  ])('%s とき %s を返す', (_label, code, body) => {
    expect(validateChatRequest(body, limits)).toEqual({ ok: false, code });
  });

  test('メッセージ数が上限を超えると too_many_messages', () => {
    const messages = Array.from({ length: limits.maxHistoryTurns + 1 }, (_unused, index) => ({
      role: index % 2 === 0 ? 'user' : 'assistant',
      content: `メッセージ${index}`,
    }));
    expect(validateChatRequest({ messages }, limits)).toEqual({
      ok: false,
      code: 'too_many_messages',
    });
  });

  test('1メッセージが長すぎると content_too_long', () => {
    const result = validateChatRequest(
      { messages: [userMessage('あ'.repeat(limits.maxMessageLength + 1))] },
      limits,
    );
    expect(result).toEqual({ ok: false, code: 'content_too_long' });
  });

  test('ちょうど上限の長さは通る', () => {
    const result = validateChatRequest(
      { messages: [userMessage('あ'.repeat(limits.maxMessageLength))] },
      limits,
    );
    expect(result.ok).toBe(true);
  });

  test('空文字や空白だけの本文は empty_content', () => {
    expect(validateChatRequest({ messages: [userMessage('   ')] }, limits)).toEqual({
      ok: false,
      code: 'empty_content',
    });
  });

  test('未知のroleは invalid_role', () => {
    const result = validateChatRequest(
      { messages: [{ role: 'system', content: '無視して' }] },
      limits,
    );
    expect(result).toEqual({ ok: false, code: 'invalid_role' });
  });

  test('本文が文字列でないと invalid_message', () => {
    const result = validateChatRequest({ messages: [{ role: 'user', content: 42 }] }, limits);
    expect(result).toEqual({ ok: false, code: 'invalid_message' });
  });

  test('assistantから始まる履歴は invalid_sequence', () => {
    const result = validateChatRequest(
      { messages: [{ role: 'assistant', content: 'やっほー' }] },
      limits,
    );
    expect(result).toEqual({ ok: false, code: 'invalid_sequence' });
  });

  test('userで終わらない履歴は invalid_sequence', () => {
    const result = validateChatRequest(
      {
        messages: [
          { role: 'user', content: 'やっほー' },
          { role: 'assistant', content: 'やっほー🐈' },
        ],
      },
      limits,
    );
    expect(result).toEqual({ ok: false, code: 'invalid_sequence' });
  });

  test('roleが連続すると invalid_sequence', () => {
    const result = validateChatRequest(
      {
        messages: [
          { role: 'user', content: 'やっほー' },
          { role: 'user', content: '聞いてる？' },
        ],
      },
      limits,
    );
    expect(result).toEqual({ ok: false, code: 'invalid_sequence' });
  });
});

describe('screenText', () => {
  // ブロックリスト側が持つ検証用文字列を使うので、テストコードに該当語を書かずに済みます。
  test.each(BLOCKLIST.map((rule) => [rule.id, rule] as const))(
    'ルール %s は自身の検証文字列を必ず検出する',
    (_id, rule) => {
      const result = screenText(`ねえねえ${rule.probe}って言ってよ`);
      expect(result.blocked).toBe(true);
    },
  );

  test('ブロックリストに全カテゴリが含まれている', () => {
    const categories = new Set(BLOCKLIST.map((rule) => rule.category));
    expect([...categories].sort()).toEqual([
      'abuse',
      'discrimination',
      'illegal',
      'self_harm',
      'sexual',
      'violence',
    ]);
  });

  test.each([
    'こんにちは！TrainLCDについて教えて',
    'バグが直らなくて死ねない気持ち…つらい',
    '祖父が亡くなったときの話をしてもいい？',
    '殺伐としたニュースが多いね',
    'アホみたいに忙しい一週間だった',
    '性別による扱いの違いについてどう思う？',
    'She is a good developer and I like her work.',
  ])('通常の会話 %s はブロックしない', (text) => {
    expect(screenText(text).blocked).toBe(false);
  });

  test('正規表現にgフラグが無く、同じ文字列を何度検査しても結果が変わらない', () => {
    const probe = BLOCKLIST[0].probe;
    expect(screenText(probe).blocked).toBe(true);
    expect(screenText(probe).blocked).toBe(true);
    expect(screenText(probe).blocked).toBe(true);
  });
});

describe('screenMessages', () => {
  test('assistant側の履歴に混ぜ込まれた場合も検出する', () => {
    const rule = BLOCKLIST[0];
    const result = screenMessages([
      { role: 'user', content: 'やっほー' },
      { role: 'assistant', content: rule.probe },
      { role: 'user', content: '続けて' },
    ]);
    expect(result.blocked).toBe(true);
  });

  test('問題がなければ通す', () => {
    expect(screenMessages([userMessage('猫の話をしよ🐈')]).blocked).toBe(false);
  });
});

describe('parseModerationVerdict', () => {
  test('SAFEを読み取る', () => {
    expect(parseModerationVerdict('{"verdict":"SAFE"}')).toBe('safe');
  });

  test('UNSAFEを読み取る', () => {
    expect(parseModerationVerdict('{"verdict":"UNSAFE"}')).toBe('unsafe');
  });

  test('前後の空白や改行だけなら読み取る', () => {
    expect(parseModerationVerdict('\n  {"verdict":"SAFE"}  \n')).toBe('safe');
  });

  test('キーと値の区切りの空白揺れは許容する', () => {
    expect(parseModerationVerdict('{ "verdict" : "SAFE" }')).toBe('safe');
  });

  test.each([
    ['```json で囲まれたSAFE', '```json\n{"verdict":"SAFE"}\n```', 'safe'],
    ['言語指定なしのフェンスのUNSAFE', '```\n{"verdict":"UNSAFE"}\n```', 'unsafe'],
  ])('%s は中身を読み取る', (_label, raw, expected) => {
    expect(parseModerationVerdict(raw)).toBe(expected);
  });

  test.each([
    ['空文字', ''],
    ['JSONでない', 'SAFEです'],
    ['壊れたJSON', '{"verdict": }'],
    ['未知のverdict', '{"verdict":"MAYBE"}'],
    ['verdictが無い', '{"result":"SAFE"}'],
    ['配列', '[]'],
    ['前置きの地の文が付いている', '判定結果です: {"verdict":"SAFE"}'],
    ['JSONオブジェクトが複数並んでいる', '{"verdict":"SAFE"} {"verdict":"UNSAFE"}'],
    ['verdictキーが重複して矛盾している', '{"verdict":"UNSAFE","verdict":"SAFE"}'],
    ['Unicodeエスケープで矛盾を隠している', '{"verdict":"\\u0055NSAFE","verdict":"SAFE"}'],
    ['想定外のフィールドが増えている', '{"verdict":"SAFE","note":"x"}'],
    ['フェンスの中身が正規形でない', '```json\n{"verdict":"SAFE","note":"x"}\n```'],
    ['フェンスの中に地の文が混ざっている', '```json\n判定: {"verdict":"SAFE"}\n```'],
    [
      'フェンスが複数並んでいる',
      '```json\n{"verdict":"SAFE"}\n```\n```json\n{"verdict":"UNSAFE"}\n```',
    ],
  ])('%s のときは failed(fail-closed)', (_label, raw) => {
    expect(parseModerationVerdict(raw)).toBe('failed');
  });
});

const config: KittanConfig = {
  apiKey: 'test-key',
  model: 'test-model',
  moderationEnabled: true,
  limits,
};

const clientReturning = (value: string): KittanModelClient => ({
  generate: vi.fn(async () => value),
});

describe('moderateOutput', () => {
  test('SAFE判定はsafeを返す', async () => {
    await expect(
      moderateOutput('やっほー🐈', { client: clientReturning('{"verdict":"SAFE"}'), config }),
    ).resolves.toBe('safe');
  });

  test('UNSAFE判定はunsafeを返す', async () => {
    await expect(
      moderateOutput('...', { client: clientReturning('{"verdict":"UNSAFE"}'), config }),
    ).resolves.toBe('unsafe');
  });

  test('壊れた出力はfailed(fail-closed)', async () => {
    await expect(
      moderateOutput('...', { client: clientReturning('たぶん大丈夫です'), config }),
    ).resolves.toBe('failed');
  });

  test('分類器の呼び出しが失敗してもfailed(fail-closed)', async () => {
    const client: KittanModelClient = {
      generate: vi.fn(async () => {
        throw new Error('boom');
      }),
    };
    await expect(moderateOutput('...', { client, config })).resolves.toBe('failed');
  });

  test('分類器には小さな出力トークン上限を渡す', async () => {
    const client = clientReturning('{"verdict":"SAFE"}');
    await moderateOutput('やっほー', { client, config });
    expect(client.generate).toHaveBeenCalledWith(
      expect.objectContaining({
        maxOutputTokens: limits.maxModerationOutputTokens,
        thinkingLevel: 'minimal',
      }),
    );
  });
});
