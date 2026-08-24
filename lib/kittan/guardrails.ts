import { buildModerationInstruction } from './persona';
import type {
  ChatMessage,
  ChatRequest,
  KittanConfig,
  KittanLimits,
  RequestValidationCode,
} from './types';
import type { KittanModelClient } from './gemini';

/**
 * 安全対策の1層目(ルールベース)と、2層目(LLMによる出力チェック)。
 * どの層も「迷ったら止める(fail-closed)」方針で実装しています。
 */

export type BlocklistCategory =
  | 'abuse'
  | 'discrimination'
  | 'sexual'
  | 'violence'
  | 'illegal'
  | 'self_harm';

export type BlocklistRule = {
  id: string;
  category: BlocklistCategory;
  pattern: RegExp;
  /**
   * そのルールが確実にマッチする検証用の文字列。
   * テストからブロックリストを網羅的に確認するために使います
   * (テストコード側に該当語を書かなくて済むようにするための仕組み)。
   */
  probe: string;
};

/**
 * 通常の日本語を巻き込みにくいよう、否定の接続(「死ねない」など)は除外し、
 * 単語だけで意味が確定しにくい語は複合語の形でのみ拾っています。
 * 網羅性は狙わず、明確な語を安く弾く「一次フィルター」と位置づけています。
 */
export const BLOCKLIST: readonly BlocklistRule[] = [
  {
    id: 'jp-die',
    category: 'abuse',
    pattern: /死ね(?![ばなるまずたん])|氏ね(?!ば)/,
    probe: '死ね',
  },
  {
    id: 'jp-drop-dead',
    category: 'abuse',
    pattern: /くたば(れ|って)/,
    probe: 'くたばれ',
  },
  {
    id: 'jp-kill-threat',
    category: 'abuse',
    pattern: /(殺す|ころす|コロス)ぞ|殺してやる|ぶっ殺/,
    probe: '殺してやる',
  },
  {
    id: 'jp-name-calling',
    category: 'abuse',
    pattern:
      /(クソ|くそ|糞)(野郎|ガキ|女|男|人間|ども)|(バカ|馬鹿|ばか|アホ|あほ|阿呆)(野郎|女|男|ども)|カス野郎|ゴミクズ|クズ野郎|生きる価値がない/,
    probe: 'クソ野郎',
  },
  {
    id: 'en-abuse',
    category: 'abuse',
    pattern: /\b(fuck(ing|er)?|bastard|asshole|bitch|piece of shit)\b/i,
    probe: 'asshole',
  },
  {
    id: 'jp-slur',
    category: 'discrimination',
    pattern: /キチガイ|きちがい|気違い|気狂い|ガイジ|池沼|土人|劣等民族/,
    probe: '池沼',
  },
  {
    id: 'en-slur',
    category: 'discrimination',
    pattern: /\b(nigg(er|a)s?|retard(ed)?|faggots?|chinks?)\b/i,
    probe: 'retarded',
  },
  {
    id: 'jp-sexual',
    category: 'sexual',
    pattern:
      /セックス|性行為|射精|オナニー|自慰|アダルト動画|エロ画像|裸の(写真|画像)|レイプ|強姦|痴漢し|わいせつな(画像|行為)|下着を(見せ|脱)/,
    probe: 'レイプ',
  },
  {
    id: 'en-sexual',
    category: 'sexual',
    pattern: /\b(porn|pornography|blowjob|handjob|hentai|nudes?\s+pics?)\b/i,
    probe: 'porn',
  },
  {
    id: 'jp-violence',
    category: 'violence',
    pattern:
      /爆(弾|発物)の(作り方|作成方法|材料)|人を(殺す|傷つける)(方法|やり方)|殺人の(方法|やり方)|毒(物|薬)の(作り方|入手)|銃の(作り方|自作)|テロを(起こ|実行)/,
    probe: '爆弾の作り方',
  },
  {
    id: 'en-violence',
    category: 'violence',
    pattern: /\bhow to (make|build) a (bomb|explosive)\b|\bhow to kill (a|someone|people)\b/i,
    probe: 'how to make a bomb',
  },
  {
    id: 'jp-illegal',
    category: 'illegal',
    pattern:
      /覚醒剤|違法薬物|大麻の(買|入手|栽培)|拳銃を(買|入手)|偽造(パスポート|免許証|紙幣)|(他人|人)の(アカウント|口座)を(乗っ取|ハッキング)|カード情報を(盗|抜)/,
    probe: '違法薬物',
  },
  {
    id: 'en-illegal',
    category: 'illegal',
    pattern:
      /\bhow to (buy|get) (meth|cocaine|heroin)\b|\bhow to (make|cook) (meth|napalm)\b|\bsteal (a )?credit card\b/i,
    probe: 'how to make meth',
  },
  {
    /**
     * 「つらい」「消えたい」といった相談そのものは止めません。
     * 具体的な手段を求める/教える表現だけを弾き、悩みの吐露はモデルに渡して
     * システムプロンプトのルール(寄り添って相談窓口を案内)で受け止めます。
     */
    id: 'jp-self-harm-method',
    category: 'self_harm',
    pattern:
      /自殺(の方法|する方法|の仕方)|首を吊る(方法|やり方)|楽に死ねる(方法|薬)|オーバードーズの(方法|やり方)/,
    probe: '自殺の方法',
  },
  {
    id: 'en-self-harm-method',
    category: 'self_harm',
    pattern: /\bhow to (kill myself|commit suicide)\b|\bpainless way to die\b/i,
    probe: 'how to kill myself',
  },
];

export type ScreenResult = { blocked: false } | { blocked: true; rule: BlocklistRule };

/** ブロックリストに1件でも当たれば止めます。 */
export const screenText = (text: string): ScreenResult => {
  for (const rule of BLOCKLIST) {
    if (rule.pattern.test(text)) {
      return { blocked: true, rule };
    }
  }
  return { blocked: false };
};

/**
 * 会話履歴はすべてクライアント由来なので、user / assistant の別なく全件を検査します。
 */
export const screenMessages = (messages: readonly ChatMessage[]): ScreenResult => {
  for (const message of messages) {
    const result = screenText(message.content);
    if (result.blocked) {
      return result;
    }
  }
  return { blocked: false };
};

export type ValidationResult =
  | { ok: true; messages: ChatMessage[] }
  | { ok: false; code: RequestValidationCode };

const isChatRole = (value: unknown): value is ChatMessage['role'] =>
  value === 'user' || value === 'assistant';

/**
 * 形・長さ・件数・role の並びを検証します。
 * 会話履歴は user から始まり、user と assistant が交互で、user で終わる必要があります。
 */
export const validateChatRequest = (request: unknown, limits: KittanLimits): ValidationResult => {
  if (typeof request !== 'object' || request === null) {
    return { ok: false, code: 'invalid_body' };
  }

  const { messages } = request as Partial<ChatRequest>;
  if (!Array.isArray(messages)) {
    return { ok: false, code: 'invalid_body' };
  }
  if (messages.length === 0) {
    return { ok: false, code: 'empty_messages' };
  }
  if (messages.length > limits.maxHistoryTurns) {
    return { ok: false, code: 'too_many_messages' };
  }

  const normalized: ChatMessage[] = [];
  for (const [index, message] of messages.entries()) {
    if (typeof message !== 'object' || message === null) {
      return { ok: false, code: 'invalid_message' };
    }
    const { role, content } = message as Partial<ChatMessage>;
    if (!isChatRole(role)) {
      return { ok: false, code: 'invalid_role' };
    }
    if (typeof content !== 'string') {
      return { ok: false, code: 'invalid_message' };
    }
    const trimmed = content.trim();
    if (trimmed.length === 0) {
      return { ok: false, code: 'empty_content' };
    }
    if (trimmed.length > limits.maxMessageLength) {
      return { ok: false, code: 'content_too_long' };
    }

    const expectedRole = index % 2 === 0 ? 'user' : 'assistant';
    if (role !== expectedRole) {
      return { ok: false, code: 'invalid_sequence' };
    }

    normalized.push({ role, content: trimmed });
  }

  if (normalized[normalized.length - 1]?.role !== 'user') {
    return { ok: false, code: 'invalid_sequence' };
  }

  return { ok: true, messages: normalized };
};

export type ModerationVerdict = 'safe' | 'unsafe' | 'failed';

export type ModerateOutputDeps = {
  client: KittanModelClient;
  config: KittanConfig;
};

const VERDICT_PATTERN = /\{[^{}]*\}/;

/**
 * 分類器の出力を厳しく解釈します。
 * JSONとして読めない / verdict が SAFE でない / 例外 —— すべて安全側(止める)に倒します。
 */
export const parseModerationVerdict = (raw: string): ModerationVerdict => {
  const match = VERDICT_PATTERN.exec(raw);
  if (match === null) {
    return 'failed';
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(match[0]);
  } catch {
    return 'failed';
  }
  if (typeof parsed !== 'object' || parsed === null) {
    return 'failed';
  }
  const { verdict } = parsed as Record<string, unknown>;
  if (verdict === 'SAFE') {
    return 'safe';
  }
  if (verdict === 'UNSAFE') {
    return 'unsafe';
  }
  return 'failed';
};

/**
 * 安全対策の2層目。生成済みの返答をもう一度モデルに渡して SAFE / UNSAFE を判定させます。
 * 呼び出し自体が失敗した場合も 'failed'(= ブロック)を返します。
 */
export const moderateOutput = async (
  reply: string,
  deps: ModerateOutputDeps,
): Promise<ModerationVerdict> => {
  let raw: string;
  try {
    raw = await deps.client.generate({
      systemInstruction: buildModerationInstruction(),
      messages: [
        {
          role: 'user',
          content: `<reply>\n${reply}\n</reply>`,
        },
      ],
      maxOutputTokens: deps.config.limits.maxModerationOutputTokens,
      thinkingLevel: 'low',
    });
  } catch {
    return 'failed';
  }
  return parseModerationVerdict(raw);
};
