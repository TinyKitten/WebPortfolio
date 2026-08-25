import { describe, expect, test } from 'vite-plus/test';
import { BLOCKLIST } from './guardrails';
import {
  XArchiveParseError,
  cleanTweetText,
  extractTweets,
  filterCandidates,
  filterCandidatesWithStats,
  parseArchiveJs,
  rankCandidates,
} from './xArchive';

/**
 * 実際のポストは使わず、アーカイブの形だけを真似た作り物で検証します。
 * NGワードもテストコードには書かず、`BLOCKLIST` の `probe` から組み立てます。
 */
const PROBE_WORD = BLOCKLIST[0].probe;

const ARCHIVE_ENTRIES: unknown[] = [
  {
    tweet: {
      id_str: '1001',
      full_text: 'React Nativeでハマった &amp; 直った話 https://t.co/abc123',
      created_at: 'Mon Aug 10 01:00:00 +0000 2026',
      favorite_count: '12',
      retweet_count: '1',
      lang: 'ja',
      entities: { urls: [{ url: 'https://t.co/abc123', expanded_url: 'https://example.com/' }] },
    },
  },
  {
    tweet: {
      id_str: '1002',
      full_text: 'RT @someone: 便利なツールを見つけたので共有します',
      created_at: 'Tue Aug 11 01:00:00 +0000 2026',
      favorite_count: '50',
      lang: 'ja',
    },
  },
  {
    tweet: {
      id_str: '1003',
      full_text: '@friend8205 それめっちゃわかる〜 僕も同じところでハマったよ',
      created_at: 'Wed Aug 12 01:00:00 +0000 2026',
      favorite_count: '3',
      lang: 'ja',
      in_reply_to_status_id_str: '999',
      in_reply_to_screen_name: 'friend8205',
    },
  },
  {
    tweet: {
      id_str: '1004',
      full_text: 'Just shipped a new version of the app today, feedback is welcome!',
      created_at: 'Thu Aug 13 01:00:00 +0000 2026',
      favorite_count: '30',
      lang: 'en',
    },
  },
  {
    tweet: {
      id_str: '1005',
      full_text: 'おはよ',
      created_at: 'Fri Aug 14 01:00:00 +0000 2026',
      favorite_count: '4',
      lang: 'ja',
    },
  },
  {
    tweet: {
      id_str: '1006',
      full_text: `${PROBE_WORD}って言われても僕はにこにこしてるよ`,
      created_at: 'Sat Aug 15 01:00:00 +0000 2026',
      favorite_count: '40',
      lang: 'ja',
    },
  },
  {
    tweet: {
      id_str: '1007',
      full_text: 'React Nativeでハマった &amp; 直った話 https://t.co/zzz999',
      created_at: 'Sun Aug 16 01:00:00 +0000 2026',
      favorite_count: '5',
      lang: 'ja',
    },
  },
  {
    tweet: {
      id_str: '1008',
      full_text: '個人開発でいちばん大事なのは、毎日ちょっとだけ触ることだと思ってる',
      created_at: 'Mon Aug 17 01:00:00 +0000 2026',
      favorite_count: '99',
      lang: 'ja',
    },
  },
  // created_at も full_text も無い壊れた要素(読み飛ばされる)。
  { tweet: { id_str: '1009' } },
  // そもそもオブジェクトですらない要素(読み飛ばされる)。
  'nope',
  {
    tweet: {
      id_str: '1010',
      full_text: '今日もブタさんカフェ行ってきた🐽',
      created_at: 'Tue Aug 18 01:00:00 +0000 2026',
      favorite_count: '7',
      lang: 'und',
    },
  },
  {
    tweet: {
      id_str: '1011',
      full_text: '#今日の積み上げ #個人開発 https://t.co/qqq111',
      created_at: 'Wed Aug 19 01:00:00 +0000 2026',
      favorite_count: '8',
      lang: 'ja',
    },
  },
  {
    tweet: {
      id_str: '1012',
      full_text: 'この前 @someone に教えてもらったツール、めちゃくちゃ便利だった',
      created_at: 'Thu Aug 20 01:00:00 +0000 2026',
      favorite_count: '6',
      lang: 'ja',
    },
  },
];

/** `data/tweets.js` の中身(`window.YTD.tweets.part0 = [ ... ]`)を模した文字列。 */
const ARCHIVE_JS = `window.YTD.tweets.part0 = ${JSON.stringify(ARCHIVE_ENTRIES, null, 2)}`;

const tweetsFromFixture = () => extractTweets(parseArchiveJs(ARCHIVE_JS));

const idsOf = (tweets: readonly { id: string }[]): string[] => tweets.map((tweet) => tweet.id);

describe('parseArchiveJs', () => {
  test('window.YTD への代入を剥がして配列を返す', () => {
    expect(parseArchiveJs(ARCHIVE_JS)).toHaveLength(ARCHIVE_ENTRIES.length);
  });

  test('代入のない素のJSON配列も読める', () => {
    expect(parseArchiveJs('[{"tweet":{"id_str":"1"}}]')).toEqual([{ tweet: { id_str: '1' } }]);
  });

  test('分割ファイル(part1)の変数名でも読める', () => {
    expect(parseArchiveJs('window.YTD.tweets.part1 = [1, 2]')).toEqual([1, 2]);
  });

  test.each([
    ['壊れたJS', 'これはアーカイブではありません'],
    ['空文字', '   '],
    ['JSONだが配列でない', 'window.YTD.tweets.part0 = {"tweet":{}}'],
    ['途中で切れたJSON', 'window.YTD.tweets.part0 = [{"tweet":'],
  ])('%s は XArchiveParseError を投げる', (_label, source) => {
    expect(() => parseArchiveJs(source)).toThrow(XArchiveParseError);
  });

  test('エラーメッセージは日本語で対処方法を示す', () => {
    expect(() => parseArchiveJs('nonsense')).toThrow(/data\/tweets\.js/);
  });
});

describe('extractTweets', () => {
  const tweets = tweetsFromFixture();

  test('壊れた要素を読み飛ばして扱える投稿だけを返す', () => {
    expect(idsOf(tweets)).toEqual([
      '1001',
      '1002',
      '1003',
      '1004',
      '1005',
      '1006',
      '1007',
      '1008',
      '1010',
      '1011',
      '1012',
    ]);
  });

  test('文字列で来る favorite_count を数値にする', () => {
    expect(tweets[0]?.favoriteCount).toBe(12);
    expect(tweets[0]?.createdAt).toBe('Mon Aug 10 01:00:00 +0000 2026');
  });

  test('RT とリプライを判別する', () => {
    expect(tweets.find((tweet) => tweet.id === '1002')?.isRetweet).toBe(true);
    expect(tweets.find((tweet) => tweet.id === '1003')?.isReply).toBe(true);
    expect(tweets.find((tweet) => tweet.id === '1001')?.isRetweet).toBe(false);
    expect(tweets.find((tweet) => tweet.id === '1001')?.isReply).toBe(false);
  });

  test('未知・欠損のフィールドがあっても落ちない', () => {
    const extracted = extractTweets([
      null,
      42,
      { tweet: null },
      { tweet: { id_str: '2001', full_text: 'テキストだけあって日付が無い' } },
      { tweet: { id_str: '2002', full_text: 'こんにちは', created_at: 'いつかの日付' } },
      {
        tweet: {
          id_str: '2003',
          full_text: '日付と本文はある',
          created_at: 'Mon Aug 10 01:00:00 +0000 2026',
          favorite_count: 5,
          unknown_field: { nested: true },
        },
      },
    ]);
    expect(idsOf(extracted)).toEqual(['2003']);
    expect(extracted[0]).toMatchObject({ favoriteCount: 5, lang: 'und', isReply: false });
  });
});

describe('cleanTweetText', () => {
  test('HTMLエンティティをデコードする', () => {
    expect(cleanTweetText('A &amp; B &lt;tag&gt; &quot;引用&quot; &#39;単&#39;')).toBe(
      'A & B <tag> "引用" \'単\'',
    );
  });

  test('t.co のURLを消す', () => {
    expect(cleanTweetText('新バージョン出しました https://t.co/abc123')).toBe(
      '新バージョン出しました',
    );
  });

  test('先頭の宛先メンションだけを消す', () => {
    expect(cleanTweetText('@alice @bob それわかる〜')).toBe('それわかる〜');
    expect(cleanTweetText('この前 @alice に聞いた')).toBe('この前 @alice に聞いた');
  });

  test('3行以上の空行を2行に畳んで前後を削る', () => {
    expect(cleanTweetText('  一行目\n\n\n\n二行目  ')).toBe('一行目\n\n二行目');
  });

  test('&amp;lt; を二重にデコードしない', () => {
    expect(cleanTweetText('&amp;lt;')).toBe('&lt;');
  });
});

describe('filterCandidatesWithStats', () => {
  const { kept, stats } = filterCandidatesWithStats(tweetsFromFixture());

  test('RT・リプライ・他言語・長さ・ノイズ・NGワード・重複を落とす', () => {
    expect(stats).toEqual({
      total: 11,
      retweets: 1,
      replies: 1,
      lang: 1,
      length: 1,
      noise: 2,
      blocked: 1,
      duplicates: 1,
      kept: 3,
    });
  });

  test('残った投稿の本文は整形済みになっている', () => {
    expect(idsOf(kept)).toEqual(['1001', '1008', '1010']);
    expect(kept[0]?.text).toBe('React Nativeでハマった & 直った話');
  });

  test('lang が und の日本語ポストも残す', () => {
    expect(idsOf(kept)).toContain('1010');
  });

  test('ブロックリストに当たる投稿は候補に入らない', () => {
    expect(kept.some((tweet) => tweet.text.includes(PROBE_WORD))).toBe(false);
  });

  test('--include-replies 相当のオプションでリプライを残す', () => {
    const withReplies = filterCandidates(tweetsFromFixture(), { includeReplies: true });
    expect(idsOf(withReplies)).toContain('1003');
    expect(withReplies.find((tweet) => tweet.id === '1003')?.text).toBe(
      'それめっちゃわかる〜 僕も同じところでハマったよ',
    );
  });

  test('オプションで長さの範囲を変えられる', () => {
    const short = filterCandidates(tweetsFromFixture(), { minLength: 1, maxLength: 20 });
    expect(idsOf(short)).toEqual(['1005', '1010']);
  });

  test('includeRetweets を立てても、RTは引用元のメンションが残るので候補にはならない', () => {
    const withRetweets = filterCandidatesWithStats(tweetsFromFixture(), { includeRetweets: true });
    expect(withRetweets.stats.retweets).toBe(0);
    expect(withRetweets.stats.noise).toBe(3);
    expect(idsOf(withRetweets.kept)).not.toContain('1002');
  });
});

describe('rankCandidates', () => {
  test('いいね順に並べて上位N件を返す', () => {
    const ranked = rankCandidates(filterCandidates(tweetsFromFixture()), 2);
    expect(ranked).toEqual([
      {
        text: '個人開発でいちばん大事なのは、毎日ちょっとだけ触ることだと思ってる',
        createdAt: 'Mon Aug 17 01:00:00 +0000 2026',
        favoriteCount: 99,
      },
      {
        text: 'React Nativeでハマった & 直った話',
        createdAt: 'Mon Aug 10 01:00:00 +0000 2026',
        favoriteCount: 12,
      },
    ]);
  });

  test('いいねが同数なら新しい順に並べる', () => {
    const base = { id: 'x', lang: 'ja', isRetweet: false, isReply: false, favoriteCount: 1 };
    const ranked = rankCandidates(
      [
        { ...base, text: '古いほう', createdAt: 'Mon Aug 10 01:00:00 +0000 2026' },
        { ...base, text: '新しいほう', createdAt: 'Mon Aug 17 01:00:00 +0000 2026' },
      ],
      2,
    );
    expect(ranked.map((candidate) => candidate.text)).toEqual(['新しいほう', '古いほう']);
  });

  test('入力の配列を破壊しない', () => {
    const tweets = filterCandidates(tweetsFromFixture());
    const before = idsOf(tweets);
    rankCandidates(tweets, 10);
    expect(idsOf(tweets)).toEqual(before);
  });

  test('top が0以下なら全件返す', () => {
    expect(rankCandidates(filterCandidates(tweetsFromFixture()), 0)).toHaveLength(3);
  });
});

describe('取り込みの流れ全体', () => {
  test('アーカイブの文字列から候補JSONの中身が組み立てられる', () => {
    const { kept, stats } = filterCandidatesWithStats(extractTweets(parseArchiveJs(ARCHIVE_JS)));
    const candidates = rankCandidates(kept, 80);

    expect(stats.total).toBe(11);
    expect(candidates).toHaveLength(3);
    expect(candidates.map((candidate) => candidate.favoriteCount)).toEqual([99, 12, 7]);
    for (const candidate of candidates) {
      expect(candidate.text).not.toMatch(/https?:\/\/t\.co\//);
      expect(candidate.text).not.toContain('@');
      expect(candidate.text).not.toContain('&amp;');
      expect(candidate.text.length).toBeGreaterThanOrEqual(10);
      expect(Number.isNaN(Date.parse(candidate.createdAt))).toBe(false);
    }
    // 候補ファイルは JSON として書き出せる形になっている。
    expect(() => JSON.parse(JSON.stringify({ stats, candidates }))).not.toThrow();
  });
});
