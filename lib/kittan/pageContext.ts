/**
 * ページごとの文脈定義。
 *
 * チャットウィジェットは全ページに出ているので、いま相手がどのページを見ているかを
 * リクエストに載せ、システムプロンプトへ「そのページに特化した指示」を足します。
 * ここはUIにもNode固有APIにも依存しない純粋モジュールで、クライアント(パス→キーの解決)と
 * サーバー(キーの検証→プロンプト組み立て)の両方から読みます。
 */

/** リクエストで受け付けるページの種類。ここに無い値はサーバーが弾きます。 */
export const KITTAN_PAGE_KEYS = ['home', 'trainlcd'] as const;

export type KittanPageKey = (typeof KITTAN_PAGE_KEYS)[number];

/** 未知のパス(404など)や page 未指定のときに使うキー。 */
export const DEFAULT_KITTAN_PAGE: KittanPageKey = 'home';

export type KittanPageContext = {
  /** プロンプトに書くページ名。 */
  title: string;
  /** そのページに何が載っているか。 */
  summary: string;
  /** そのページを見ている相手に対する話し方の指示。 */
  talkingPoints: string[];
};

/**
 * ページ別の追加指示。
 * ここに新しい事実を書かないこと(事実は portfolio.ts が単一の情報源です)。
 * あくまで「いまどのページを見ているか」に応じた話の振り方だけを書きます。
 */
export const KITTAN_PAGE_CONTEXTS: Record<KittanPageKey, KittanPageContext> = {
  home: {
    title: 'トップページ(/)',
    summary:
      'ようこそ・About(自己紹介と豆知識)・Skills・Resume(職歴)・Works(制作物)・Share の各セクションが縦に並んだ1枚もののポートフォリオ。',
    talkingPoints: [
      'サイトの入り口にいる相手なので、まずは自己紹介や好きなもの(猫・ブタさん)の話から気軽に広げる。',
      'スキルや職歴を聞かれたら、上の「基本情報」「これまでの職歴」に載っている範囲だけで答える。',
      '制作物の話になったら、TrainLCDの紹介ページ(/works/trainlcd)も見られることをさりげなく伝える。',
      'ページのどこに何が載っているか聞かれたら、上のセクションの並びを案内する。',
    ],
  },
  trainlcd: {
    title: 'TrainLCD紹介ページ(/works/trainlcd)',
    summary:
      '個人開発アプリ TrainLCD の紹介ページ。コンセプト、これまでのあゆみ、技術構成、ダウンロード導線が並ぶ。',
    talkingPoints: [
      '相手はTrainLCDに興味を持って読んでいる前提で、まずTrainLCDの話題を中心に受け答えする。',
      '機能や技術構成の質問には「基本情報」「TrainLCDのあゆみ」に書かれている範囲だけで答え、載っていない仕様は正直に「わからない」と言う。',
      '対応路線・運賃・遅延などのリアルタイムな運行情報は答えられないので、アプリそのものの説明にとどめる。',
      '話が広がったら、トップページ(/)で他の活動やプロフィールも見られることを伝える。',
    ],
  },
};

/** パスの前方一致でページを判定するための対応表(長いパスから順に見ます)。 */
const PAGE_PATH_PREFIXES: readonly { prefix: string; key: KittanPageKey }[] = [
  { prefix: '/works/trainlcd', key: 'trainlcd' },
];

/** クライアント由来の値が既知のページキーかどうかを判定します。 */
export const isKittanPageKey = (value: unknown): value is KittanPageKey =>
  typeof value === 'string' && (KITTAN_PAGE_KEYS as readonly string[]).includes(value);

/** 末尾スラッシュとクエリ・ハッシュを落として比較用のパスにします。 */
const normalizePathname = (pathname: string): string => {
  const path = pathname.split(/[?#]/)[0] ?? '';
  const trimmed = path.replace(/\/+$/, '');
  return trimmed.length === 0 ? '/' : trimmed;
};

/**
 * `usePathname()` の値からページのキーを決めます。
 * 未知のパス(404など)は既定のキーに落として、チャット自体は必ず動くようにします。
 */
export const resolveKittanPageKey = (pathname: string): KittanPageKey => {
  const path = normalizePathname(pathname);
  const matched = PAGE_PATH_PREFIXES.find(
    ({ prefix }) => path === prefix || path.startsWith(`${prefix}/`),
  );
  return matched?.key ?? DEFAULT_KITTAN_PAGE;
};
