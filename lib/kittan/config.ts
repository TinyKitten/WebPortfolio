import type { KittanConfig, KittanLimits } from './types';

/** 既定で使う生成モデル。KITTAN_MODEL で上書きできます。 */
export const DEFAULT_KITTAN_MODEL = 'gemini-3.7-flash';

/**
 * 出力トークンの上限は「思考(thinking)トークンを含めた合計」の予算です。
 * 思考トークンもこの上限を消費するため、可視出力に必要な分だけを設定すると
 * 思考だけで予算が尽きて出力が空/途中で切れます。
 * 分類器は `{"verdict":"SAFE"}` の十数トークンしか書きませんが、
 * それでも思考分を含めた合計として余裕を確保しておく必要があります。
 */
export const DEFAULT_KITTAN_LIMITS: KittanLimits = {
  maxMessageLength: 500,
  maxHistoryTurns: 20,
  maxOutputTokens: 2048,
  maxModerationOutputTokens: 1024,
};

/** 設定が足りないときに投げるエラー。詳細はユーザーには返しません。 */
export class KittanConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'KittanConfigError';
  }
}

type EnvLike = Record<string, string | undefined>;

const readEnv = (env: EnvLike | undefined, key: string): string | undefined => {
  const value = (env ?? process.env)[key];
  if (typeof value !== 'string') {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const readPositiveInt = (env: EnvLike | undefined, key: string, fallback: number): number => {
  const raw = readEnv(env, key);
  if (raw === undefined) {
    return fallback;
  }
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

/**
 * 入力バリデーションだけに必要な上限値を返します。
 * APIキーが無くても呼べるので、鍵未設定でも 400 は正しく返せます。
 */
export const readKittanLimits = (env?: EnvLike): KittanLimits => ({
  maxMessageLength: readPositiveInt(
    env,
    'KITTAN_MAX_MESSAGE_LENGTH',
    DEFAULT_KITTAN_LIMITS.maxMessageLength,
  ),
  maxHistoryTurns: readPositiveInt(
    env,
    'KITTAN_MAX_HISTORY_TURNS',
    DEFAULT_KITTAN_LIMITS.maxHistoryTurns,
  ),
  maxOutputTokens: readPositiveInt(
    env,
    'KITTAN_MAX_OUTPUT_TOKENS',
    DEFAULT_KITTAN_LIMITS.maxOutputTokens,
  ),
  maxModerationOutputTokens: readPositiveInt(
    env,
    'KITTAN_MAX_MODERATION_OUTPUT_TOKENS',
    DEFAULT_KITTAN_LIMITS.maxModerationOutputTokens,
  ),
});

/**
 * 実際にモデルを呼ぶ直前に読む設定。
 * import時ではなく呼び出し時に評価するので、鍵が無くてもビルドは通ります。
 *
 * @throws {KittanConfigError} GEMINI_API_KEY が未設定のとき。
 */
export const readKittanConfig = (env?: EnvLike): KittanConfig => {
  const apiKey = readEnv(env, 'GEMINI_API_KEY');
  if (apiKey === undefined) {
    throw new KittanConfigError(
      'GEMINI_API_KEY が設定されていません。Vercel のプロジェクト設定(またはローカルの .env.local)にサーバー専用の環境変数として追加してください。',
    );
  }

  // KITTAN_MODERATION は既定で有効。'0' / 'false' / 'off' のときだけ無効化します。
  const moderationRaw = readEnv(env, 'KITTAN_MODERATION')?.toLowerCase();
  const moderationEnabled =
    moderationRaw === undefined || !['0', 'false', 'off', 'no'].includes(moderationRaw);

  return {
    apiKey,
    model: readEnv(env, 'KITTAN_MODEL') ?? DEFAULT_KITTAN_MODEL,
    moderationEnabled,
    limits: readKittanLimits(env),
  };
};
