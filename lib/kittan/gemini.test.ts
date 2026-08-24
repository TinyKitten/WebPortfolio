import { describe, expect, test } from 'vite-plus/test';
import { KittanModelError, toChatErrorReason, toInteractionSteps } from './gemini';

describe('toInteractionSteps', () => {
  test('会話履歴を user_input / model_output のstepsに変換する', () => {
    expect(
      toInteractionSteps([
        { role: 'user', content: 'やっほー' },
        { role: 'assistant', content: 'やっほー🐈' },
      ]),
    ).toEqual([
      { type: 'user_input', content: [{ type: 'text', text: 'やっほー' }] },
      { type: 'model_output', content: [{ type: 'text', text: 'やっほー🐈' }] },
    ]);
  });

  test('履歴は毎回まるごと送る(サーバー側に残さない)', () => {
    const messages = Array.from({ length: 5 }, (_unused, index) => ({
      role: index % 2 === 0 ? ('user' as const) : ('assistant' as const),
      content: `メッセージ${index}`,
    }));
    expect(toInteractionSteps(messages)).toHaveLength(messages.length);
  });
});

describe('toChatErrorReason', () => {
  test.each([
    [401, 'auth'],
    [403, 'auth'],
    [429, 'rate_limited_upstream'],
    [500, 'unavailable'],
    [503, 'unavailable'],
    [400, 'unknown'],
    [404, 'unknown'],
  ] as const)('HTTP %s は %s に対応づける', (status, expected) => {
    expect(toChatErrorReason(Object.assign(new Error('boom'), { status }))).toBe(expected);
  });

  test('statusを持たないエラーは unknown', () => {
    expect(toChatErrorReason(new Error('boom'))).toBe('unknown');
    expect(toChatErrorReason(undefined)).toBe('unknown');
  });

  test('KittanModelError は自身の理由コードをそのまま返す', () => {
    expect(toChatErrorReason(new KittanModelError('auth', 'failed'))).toBe('auth');
  });
});
