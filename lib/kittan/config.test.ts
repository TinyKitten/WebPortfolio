import { describe, expect, test } from 'vite-plus/test';
import {
  DEFAULT_KITTAN_LIMITS,
  DEFAULT_KITTAN_MODEL,
  KittanConfigError,
  readKittanConfig,
  readKittanLimits,
} from './config';

describe('readKittanConfig', () => {
  test('GEMINI_API_KEY が無ければ KittanConfigError', () => {
    expect(() => readKittanConfig({})).toThrow(KittanConfigError);
  });

  test('空白だけのキーも未設定として扱う', () => {
    expect(() => readKittanConfig({ GEMINI_API_KEY: '   ' })).toThrow(KittanConfigError);
  });

  test('既定値を返す', () => {
    const config = readKittanConfig({ GEMINI_API_KEY: 'key' });
    expect(config).toEqual({
      apiKey: 'key',
      model: DEFAULT_KITTAN_MODEL,
      moderationEnabled: true,
      limits: DEFAULT_KITTAN_LIMITS,
    });
  });

  test('KITTAN_MODEL でモデルを差し替えられる', () => {
    const config = readKittanConfig({
      GEMINI_API_KEY: 'key',
      KITTAN_MODEL: 'another-model',
    });
    expect(config.model).toBe('another-model');
  });

  test.each(['0', 'false', 'off', 'no', 'FALSE'])(
    'KITTAN_MODERATION=%s で出力チェックを無効化できる',
    (value) => {
      const config = readKittanConfig({
        GEMINI_API_KEY: 'key',
        KITTAN_MODERATION: value,
      });
      expect(config.moderationEnabled).toBe(false);
    },
  );

  test.each(['1', 'true', 'on', ''])('KITTAN_MODERATION=%s では有効なまま(既定はオン)', (value) => {
    const config = readKittanConfig({
      GEMINI_API_KEY: 'key',
      KITTAN_MODERATION: value,
    });
    expect(config.moderationEnabled).toBe(true);
  });
});

describe('readKittanLimits', () => {
  test('APIキーが無くても読める', () => {
    expect(readKittanLimits({})).toEqual(DEFAULT_KITTAN_LIMITS);
  });

  test('環境変数で上書きできる', () => {
    expect(
      readKittanLimits({
        KITTAN_MAX_MESSAGE_LENGTH: '120',
        KITTAN_MAX_HISTORY_TURNS: '6',
      }),
    ).toMatchObject({ maxMessageLength: 120, maxHistoryTurns: 6 });
  });

  test.each(['0', '-3', 'abc'])('不正な値 %s は既定値にフォールバック', (value) => {
    expect(readKittanLimits({ KITTAN_MAX_MESSAGE_LENGTH: value })).toEqual(DEFAULT_KITTAN_LIMITS);
  });
});
