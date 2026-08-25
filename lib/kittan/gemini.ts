import { GoogleGenAI, type Interactions } from '@google/genai';
import type { ChatErrorReason, ChatMessage, KittanConfig } from './types';

/**
 * モデル呼び出しの薄いラッパー。
 * ここだけがSDKに依存するので、上位のロジックはテストでモックを差し込めます。
 * Node固有APIは使っていないため、そのままEdge/Workersへ移しても動きます。
 */

export type ThinkingLevel = 'minimal' | 'low' | 'medium' | 'high';

export type ModelGenerateRequest = {
  systemInstruction: string;
  /** 直近が user で終わる会話履歴。毎回まるごと送るステートレス方式です。 */
  messages: readonly ChatMessage[];
  maxOutputTokens: number;
  thinkingLevel?: ThinkingLevel;
};

/**
 * メソッド記法ではなくプロパティ記法で宣言しています。
 * テストから `client.generate` をそのまま参照(アサート)できるようにするためです。
 */
export type KittanModelClient = {
  generate: (request: ModelGenerateRequest) => Promise<string>;
};

/** SDK / HTTP のエラーを、上位が扱いやすい理由コードに正規化したエラー。 */
export class KittanModelError extends Error {
  readonly reason: ChatErrorReason;

  constructor(reason: ChatErrorReason, message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'KittanModelError';
    this.reason = reason;
  }
}

const statusOf = (error: unknown): number | undefined => {
  if (typeof error !== 'object' || error === null) {
    return undefined;
  }
  const { status } = error as { status?: unknown };
  return typeof status === 'number' ? status : undefined;
};

export const toChatErrorReason = (error: unknown): ChatErrorReason => {
  if (error instanceof KittanModelError) {
    return error.reason;
  }
  const status = statusOf(error);
  if (status === undefined) {
    return 'unknown';
  }
  if (status === 401 || status === 403) {
    return 'auth';
  }
  if (status === 429) {
    return 'rate_limited_upstream';
  }
  if (status >= 500) {
    return 'unavailable';
  }
  return 'unknown';
};

/**
 * 会話履歴を Interactions API の steps に変換します。
 * previous_interaction_id は使わず、毎回すべてを送る(= サーバー側に会話を残さない)方針です。
 */
export const toInteractionSteps = (messages: readonly ChatMessage[]): Interactions.Step[] =>
  messages.map((message) =>
    message.role === 'user'
      ? {
          type: 'user_input',
          content: [{ type: 'text', text: message.content }],
        }
      : {
          type: 'model_output',
          content: [{ type: 'text', text: message.content }],
        },
  );

/** 実際に Gemini を呼ぶクライアント。クライアント生成は初回呼び出しまで遅延させます。 */
export const createGeminiClient = (config: KittanConfig): KittanModelClient => {
  let sdk: GoogleGenAI | undefined;

  const getSdk = (): GoogleGenAI => {
    sdk ??= new GoogleGenAI({ apiKey: config.apiKey });
    return sdk;
  };

  return {
    async generate(request) {
      try {
        const interaction = await getSdk().interactions.create({
          model: config.model,
          // 会話をサーバー側に保存しない(プライバシー重視のステートレス運用)。
          store: false,
          stream: false,
          system_instruction: request.systemInstruction,
          generation_config: {
            thinking_level: request.thinkingLevel ?? 'low',
            max_output_tokens: request.maxOutputTokens,
          },
          input: toInteractionSteps(request.messages),
        });
        return interaction.output_text?.trim() ?? '';
      } catch (error) {
        throw new KittanModelError(toChatErrorReason(error), 'モデルの呼び出しに失敗しました。', {
          cause: error,
        });
      }
    },
  };
};
