/**
 * 「きったんとおしゃべり」機能で使う共通の型定義。
 * UIには依存しないドメイン層の型のみを置きます。
 */

export type ChatRole = 'user' | 'assistant';

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatRequest = {
  messages: ChatMessage[];
};

/** リクエストのバリデーションで検出しうる不備の種類。 */
export type RequestValidationCode =
  | 'invalid_body'
  | 'empty_messages'
  | 'too_many_messages'
  | 'invalid_message'
  | 'invalid_role'
  | 'empty_content'
  | 'content_too_long'
  | 'invalid_sequence';

/** 応答を返さずに定型文へフォールバックした理由。 */
export type ChatBlockedReason =
  | 'invalid_request'
  | 'unsafe_input'
  | 'unsafe_output'
  | 'moderation_failed'
  | 'empty_output';

/** 想定外の失敗(基本的にユーザーには詳細を見せない)。 */
export type ChatErrorReason =
  | 'missing_api_key'
  | 'auth'
  | 'rate_limited_upstream'
  | 'unavailable'
  | 'unknown';

export type ChatResult =
  | { status: 'ok'; reply: string }
  | {
      status: 'blocked';
      reason: ChatBlockedReason;
      /** ペルソナを保ったまま返す定型のお断り文。 */
      reply: string;
      /** reason が 'invalid_request' のときだけ入る詳細コード。 */
      validationCode?: RequestValidationCode;
    }
  | { status: 'error'; reason: ChatErrorReason };

export type KittanLimits = {
  /** 1メッセージあたりの最大文字数。 */
  maxMessageLength: number;
  /**
   * 受け付ける最大メッセージ数。
   * ここでの「ターン」は user / assistant いずれか1発言を指します。
   */
  maxHistoryTurns: number;
  /** 本文生成時の最大出力トークン数。 */
  maxOutputTokens: number;
  /** 出力チェック(モデレーション)時の最大出力トークン数。 */
  maxModerationOutputTokens: number;
};

export type KittanConfig = {
  apiKey: string;
  model: string;
  /** LLMによる出力チェックを行うかどうか。 */
  moderationEnabled: boolean;
  limits: KittanLimits;
};

/** 会話コーパス(data/kittan/corpus.json)の形。 */
export type KittanCorpus = {
  /** 話し方の特徴をメモした箇条書き。 */
  styleNotes: string[];
  /** X(@tinykitten8)のポストなどをもとにした発言サンプル。 */
  sampleUtterances: string[];
  /** 日常会話のQAサンプル。 */
  everydayConversation: { user: string; kittan: string }[];
};

/** ポートフォリオ内の既存データから組み立てた事実情報。 */
export type PortfolioFacts = {
  profile: string[];
  trivia: { subject: string; description: string; tags: string[] }[];
  resume: { period: string; companyName: string; description: string }[];
  trainlcd: { period: string; title: string; description: string }[];
};
