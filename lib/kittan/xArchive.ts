import { screenText } from './guardrails';

/**
 * X(旧Twitter)の公式アーカイブから、コーパスの候補を抜き出す純粋ロジック。
 *
 * 取り込みは**2段階**です。
 *
 * 1. アーカイブ → `corpus.candidates.json`(このモジュール + `scripts/import-x-corpus.ts`)
 * 2. 人間がレビュー → `data/kittan/corpus.json` の `sampleUtterances` へ手で反映
 *
 * このスクリプトは candidates を作るだけで corpus.json は書き換えません
 * (人間のレビューを挟む運用ルールのため)。コーパスの文はシステムプロンプトに入り、
 * モデルが本人の発言として引用しうるので、機械的な取り込みで済ませてはいけません。
 *
 * 同じ理由で、候補の段階でも入力と同じブロックリスト(`screenText`)を通します。
 * 昔の荒れたポストがそのままプロンプトへ混ざるのを防ぐためです。
 *
 * Node固有のAPI(`fs` など)はここでは使いません。ファイルの読み書きは
 * `scripts/import-x-corpus.ts` 側に閉じ込めています。
 */

/** アーカイブの中身が想定と違うときに投げるエラー。 */
export class XArchiveParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'XArchiveParseError';
  }
}

/** アーカイブ1件分から、口調の判断に必要な情報だけを取り出した形。 */
export type XTweet = {
  id: string;
  /** 本文。`extractTweets` の時点では未加工(HTMLエンティティやt.coのURLを含む)。 */
  text: string;
  /** `Date` で解釈できる文字列(例: `Mon Aug 25 01:00:00 +0000 2026`)。 */
  createdAt: string;
  favoriteCount: number;
  /** 判定できないときは `'und'`。 */
  lang: string;
  isRetweet: boolean;
  isReply: boolean;
};

/** レビュー用に書き出す候補1件分。 */
export type CorpusCandidate = {
  text: string;
  createdAt: string;
  favoriteCount: number;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

/**
 * `window.YTD.tweets.part0 = [...]` の代入部分を落とします。
 * 最初の `[` より前に `=` があるときだけ剥がすので、素のJSON配列も受け付けます。
 * 文末のセミコロン(付けて書き出す環境がある)も、JSONに混ざらないよう落とします。
 */
const stripAssignment = (source: string): string => {
  const arrayStart = source.indexOf('[');
  const equals = source.indexOf('=');
  const body =
    equals !== -1 && (arrayStart === -1 || equals < arrayStart) ? source.slice(equals + 1) : source;
  return body.trim().replace(/;\s*$/, '');
};

/**
 * `data/tweets.js`(分割時は `tweets-part1.js` など)の中身を配列にします。
 * 中身の1件ずつは検証しないので、戻り値は `unknown[]` のままです。
 *
 * @throws {XArchiveParseError} 代入部分を剥がしてもJSON配列にならないとき。
 */
export const parseArchiveJs = (source: string): unknown[] => {
  const json = stripAssignment(source).trim();
  if (json.length === 0) {
    throw new XArchiveParseError(
      'アーカイブのファイルが空です。X からダウンロードした data/tweets.js を指定してください。',
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new XArchiveParseError(
      'アーカイブのJSONを読めませんでした。`window.YTD.tweets.part0 = [ ... ]` の形をした data/tweets.js を指定してください。',
    );
  }

  if (!Array.isArray(parsed)) {
    throw new XArchiveParseError(
      'アーカイブの中身が配列ではありませんでした。data/tweets.js(または tweets-part1.js などの分割ファイル)を指定してください。',
    );
  }
  return parsed;
};

/** 文字列でも数値でも来る件数フィールドを数値にします。読めなければ 0。 */
const toCount = (value: unknown): number => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

const toNonEmptyString = (value: unknown): string | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

/**
 * `{ "tweet": { ... } }` の並びから、扱える形の投稿だけを取り出します。
 *
 * アーカイブは年代によってフィールドが揺れる(欠ける・型が変わる)ので、
 * **壊れている1件で全体を落とさない**方針です。ID・本文・日付のどれかが
 * 読めない要素は黙って読み飛ばします。
 */
export const extractTweets = (raw: readonly unknown[]): XTweet[] => {
  const tweets: XTweet[] = [];

  for (const entry of raw) {
    if (!isRecord(entry)) {
      continue;
    }
    // 新しいアーカイブは `tweet` で包まれていますが、古い形式は素の投稿が並びます。
    const tweet = isRecord(entry.tweet) ? entry.tweet : entry;

    const id = toNonEmptyString(tweet.id_str) ?? toNonEmptyString(tweet.id);
    const text = toNonEmptyString(tweet.full_text) ?? toNonEmptyString(tweet.text);
    const createdAt = toNonEmptyString(tweet.created_at);
    if (id === undefined || text === undefined || createdAt === undefined) {
      continue;
    }
    // 日付が読めないと並び替えが壊れるので、ここで落とします。
    if (Number.isNaN(Date.parse(createdAt))) {
      continue;
    }

    const isReply =
      toNonEmptyString(tweet.in_reply_to_status_id_str) !== undefined ||
      toNonEmptyString(tweet.in_reply_to_screen_name) !== undefined;

    tweets.push({
      id,
      text,
      createdAt,
      favoriteCount: toCount(tweet.favorite_count),
      lang: toNonEmptyString(tweet.lang) ?? 'und',
      isRetweet: text.startsWith('RT @'),
      isReply,
    });
  }

  return tweets;
};

/** 最低限のHTMLエンティティ。`&amp;` は二重デコードを避けるため最後に置きます。 */
const HTML_ENTITIES: readonly (readonly [RegExp, string])[] = [
  [/&lt;/g, '<'],
  [/&gt;/g, '>'],
  [/&quot;/g, '"'],
  [/&#0*39;/g, "'"],
  [/&apos;/g, "'"],
  [/&nbsp;/g, ' '],
  [/&amp;/g, '&'],
];

const TCO_URL = /https?:\/\/t\.co\/\w+/g;
/** リプライの先頭に並ぶ宛先メンション。 */
const LEADING_MENTIONS = /^(?:@[A-Za-z0-9_]+[\s]*)+/;

/**
 * プロンプトに入れられる形へ本文を整えます。
 * エンティティのデコード → t.coのURL除去 → 先頭メンション除去 → 空行の圧縮、の順です。
 */
export const cleanTweetText = (text: string): string => {
  let cleaned = text.replace(/\r\n?/g, '\n');
  for (const [pattern, replacement] of HTML_ENTITIES) {
    cleaned = cleaned.replace(pattern, replacement);
  }
  cleaned = cleaned.replace(TCO_URL, '');
  cleaned = cleaned.replace(/^[\s]+/, '').replace(LEADING_MENTIONS, '');
  cleaned = cleaned.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n');
  return cleaned.trim();
};

export type FilterOptions = {
  /** 既定では落とします(引用元の文体が混ざるため)。 */
  includeRetweets?: boolean;
  /** 既定では落とします(相手の文脈が無いと意味が取れないため)。 */
  includeReplies?: boolean;
  /** 既定は `['ja', 'und']`。短い日本語のポストはよく `und` になります。 */
  allowedLangs?: readonly string[];
  /** 整形後の下限文字数(既定10)。 */
  minLength?: number;
  /** 整形後の上限文字数(既定300)。 */
  maxLength?: number;
};

/** どの理由で何件落ちたかの内訳(CLIのサマリー表示用)。 */
export type FilterStats = {
  total: number;
  retweets: number;
  replies: number;
  lang: number;
  length: number;
  /** 整形後もメンションが残る/ハッシュタグとURLしか残らないもの。 */
  noise: number;
  /** ブロックリストに当たったもの。 */
  blocked: number;
  duplicates: number;
  kept: number;
};

const DEFAULT_ALLOWED_LANGS: readonly string[] = ['ja', 'und'];

/** ハッシュタグ・URL・記号だけになった残りかすを判定します。 */
const isNoiseOnly = (text: string): boolean =>
  text
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[#＃]\S+/g, '')
    .replace(/[\s　]+/g, '')
    .replace(/[-–—.,!?！？、。・…ー:;"'“”()（）[\]【】]/g, '').length === 0;

export type FilterResult = {
  /** `text` は整形済みの本文に差し替わっています。 */
  kept: XTweet[];
  stats: FilterStats;
};

/**
 * 候補になりうる投稿だけに絞り、本文を整形済みのものへ差し替えて返します。
 * 落とした理由の内訳も一緒に返すので、CLIはこれをそのまま表示できます。
 *
 * 判定の順番は「安く落とせるもの → 整形が要るもの → 安全確認 → 重複」です。
 */
export const filterCandidatesWithStats = (
  tweets: readonly XTweet[],
  options: FilterOptions = {},
): FilterResult => {
  const {
    includeRetweets = false,
    includeReplies = false,
    allowedLangs = DEFAULT_ALLOWED_LANGS,
    minLength = 10,
    maxLength = 300,
  } = options;

  const stats: FilterStats = {
    total: tweets.length,
    retweets: 0,
    replies: 0,
    lang: 0,
    length: 0,
    noise: 0,
    blocked: 0,
    duplicates: 0,
    kept: 0,
  };

  const seen = new Set<string>();
  const kept: XTweet[] = [];

  for (const tweet of tweets) {
    if (!includeRetweets && tweet.isRetweet) {
      stats.retweets += 1;
      continue;
    }
    if (!includeReplies && tweet.isReply) {
      stats.replies += 1;
      continue;
    }
    if (!allowedLangs.includes(tweet.lang)) {
      stats.lang += 1;
      continue;
    }

    const text = cleanTweetText(tweet.text);
    if (text.length < minLength || text.length > maxLength) {
      stats.length += 1;
      continue;
    }
    // 途中に挟まったメンションは他人の話題を引きずっているので落とします。
    if (text.includes('@') || isNoiseOnly(text)) {
      stats.noise += 1;
      continue;
    }
    // コーパスの文はシステムプロンプトに入るため、入力と同じ検査を通します。
    if (screenText(text).blocked) {
      stats.blocked += 1;
      continue;
    }
    if (seen.has(text)) {
      stats.duplicates += 1;
      continue;
    }

    seen.add(text);
    kept.push({ ...tweet, text });
  }

  stats.kept = kept.length;
  return { kept, stats };
};

/** 内訳が要らない呼び出し向けの薄いラッパー。 */
export const filterCandidates = (
  tweets: readonly XTweet[],
  options: FilterOptions = {},
): XTweet[] => filterCandidatesWithStats(tweets, options).kept;

/**
 * いいねの多い順(同数なら新しい順)に並べて上位 `top` 件を返します。
 * 反応が多かったポストほど「らしさ」が出ていることが多い、という当てずっぽうの
 * ヒューリスティックなので、最終的な取捨は人間のレビューで行ってください。
 */
export const rankCandidates = (tweets: readonly XTweet[], top: number): CorpusCandidate[] => {
  const limit = Number.isFinite(top) && top > 0 ? Math.floor(top) : tweets.length;
  return [...tweets]
    .sort((a, b) => {
      if (a.favoriteCount !== b.favoriteCount) {
        return b.favoriteCount - a.favoriteCount;
      }
      return Date.parse(b.createdAt) - Date.parse(a.createdAt);
    })
    .slice(0, limit)
    .map(({ text, createdAt, favoriteCount }) => ({ text, createdAt, favoriteCount }));
};
