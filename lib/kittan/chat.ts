import { KittanConfigError, readKittanConfig, readKittanLimits } from './config';
import { getKittanCorpus } from './corpus';
import { createGeminiClient, toChatErrorReason } from './gemini';
import type { KittanModelClient } from './gemini';
import { moderateOutput, screenMessages, screenText, validateChatRequest } from './guardrails';
import { KITTAN_FALLBACK_REPLY, buildSystemInstruction } from './persona';
import { getPortfolioFacts } from './portfolio';
import type { ChatBlockedReason, ChatResult, KittanConfig, RequestValidationCode } from './types';

/**
 * 「きったんとおしゃべり」の司令塔。
 *
 * 検証 → 入力のルール検査 → 生成 → 出力のルール検査 → 出力のLLM検査 の順に通し、
 * どこかで止まったら必ず同じ定型文へフォールバックします。
 * v1は意図的に非ストリーミングです(全文がチェックを通るまで何も返さないため)。
 */

export type ChatDeps = {
  /** 本文生成に使うクライアント。省略時は設定から実クライアントを作ります。 */
  client?: KittanModelClient;
  /** 出力チェックに使うクライアント。省略時は client と同じものを使います。 */
  moderationClient?: KittanModelClient;
  config?: KittanConfig;
  /** システムプロンプト。省略時はコーパスとポートフォリオから組み立てます。 */
  systemInstruction?: string;
};

const blocked = (
  reason: ChatBlockedReason,
  validationCode?: RequestValidationCode,
): ChatResult => ({
  status: 'blocked',
  reason,
  reply: KITTAN_FALLBACK_REPLY,
  ...(validationCode === undefined ? {} : { validationCode }),
});

export const chatWithKittan = async (
  request: unknown,
  deps: ChatDeps = {},
): Promise<ChatResult> => {
  const limits = deps.config?.limits ?? readKittanLimits();

  const validation = validateChatRequest(request, limits);
  if (!validation.ok) {
    return blocked('invalid_request', validation.code);
  }

  // 1層目(入力): 明らかにアウトな語が含まれていればモデルを呼ばずに止めます。
  if (screenMessages(validation.messages).blocked) {
    return blocked('unsafe_input');
  }

  let config: KittanConfig;
  try {
    config = deps.config ?? readKittanConfig();
  } catch (error) {
    if (error instanceof KittanConfigError) {
      return { status: 'error', reason: 'missing_api_key' };
    }
    return { status: 'error', reason: 'unknown' };
  }

  const client = deps.client ?? createGeminiClient(config);
  const systemInstruction =
    deps.systemInstruction ?? buildSystemInstruction(getKittanCorpus(), getPortfolioFacts());

  let reply: string;
  try {
    reply = await client.generate({
      systemInstruction,
      messages: validation.messages,
      maxOutputTokens: config.limits.maxOutputTokens,
      // 思考は low に留めつつ、実行時間はトークン予算(maxOutputTokens)で抑えます。
      thinkingLevel: 'low',
    });
  } catch (error) {
    return { status: 'error', reason: toChatErrorReason(error) };
  }

  const trimmed = reply.trim();
  if (trimmed.length === 0) {
    // 空応答は既定の安全フィルターが働いた可能性もあるので、そのまま返さず定型文にします。
    return blocked('empty_output');
  }

  // 2層目(出力): ルールベース。
  if (screenText(trimmed).blocked) {
    return blocked('unsafe_output');
  }

  // 3層目(出力): LLMによる分類。判定不能はすべてブロック扱い(fail-closed)。
  if (config.moderationEnabled) {
    const verdict = await moderateOutput(trimmed, {
      client: deps.moderationClient ?? client,
      config,
    });
    if (verdict === 'unsafe') {
      return blocked('unsafe_output');
    }
    if (verdict === 'failed') {
      return blocked('moderation_failed');
    }
  }

  return { status: 'ok', reply: trimmed };
};
