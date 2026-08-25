import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import {
  XArchiveParseError,
  extractTweets,
  filterCandidatesWithStats,
  parseArchiveJs,
  rankCandidates,
  type CorpusCandidate,
  type FilterStats,
  type XTweet,
} from '../lib/kittan/xArchive';

/**
 * X の公式アーカイブから、コーパスの候補ファイルを作るCLI。
 *
 * ```sh
 * vp dlx tsx scripts/import-x-corpus.ts data/kittan/x-archive/data/tweets.js --top 80
 * ```
 *
 * **corpus.json は書き換えません。** 出力するのは候補ファイルだけで、
 * `sampleUtterances` への反映は人間のレビューを挟んで手作業で行います
 * (理由は lib/kittan/xArchive.ts の先頭と lib/kittan/README.md を参照)。
 *
 * ここはファイルの読み書きと表示だけを担当し、判定ロジックは
 * すべて lib/kittan/xArchive.ts に置いています(Node固有APIをこのファイルに閉じ込めるため)。
 */

/** 上書きを禁止するコーパス本体。 */
const CORPUS_PATH = 'data/kittan/corpus.json';
const DEFAULT_OUT = 'data/kittan/corpus.candidates.json';
const DEFAULT_TOP = 80;

const USAGE = `使い方:
  vp dlx tsx scripts/import-x-corpus.ts <path/to/data/tweets.js> [分割ファイル...] [オプション]

オプション:
  --top <件数>          候補として書き出す上限(既定: ${DEFAULT_TOP})
  --include-replies     リプライも候補に含める(既定: 除外)
  --out <パス>          出力先(既定: ${DEFAULT_OUT})`;

type CliOptions = {
  files: string[];
  top: number;
  includeReplies: boolean;
  out: string;
};

class CliError extends Error {}

const parseArgs = (argv: readonly string[]): CliOptions => {
  const files: string[] = [];
  let top = DEFAULT_TOP;
  let includeReplies = false;
  let out = DEFAULT_OUT;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index] ?? '';
    if (arg === '--include-replies') {
      includeReplies = true;
    } else if (arg === '--top' || arg === '--out') {
      const value = argv[index + 1];
      if (value === undefined || value.startsWith('--')) {
        throw new CliError(`${arg} には値が必要です。`);
      }
      index += 1;
      if (arg === '--top') {
        // Number.parseInt は '1.5' や '12abc' を黙って 1 / 12 として受けてしまうため使いません。
        const parsed = Number(value);
        if (!Number.isSafeInteger(parsed) || parsed <= 0) {
          throw new CliError('--top には1以上の整数を指定してください。');
        }
        top = parsed;
      } else {
        out = value;
      }
    } else if (arg === '--help' || arg === '-h') {
      throw new CliError(USAGE);
    } else if (arg.startsWith('--')) {
      throw new CliError(`知らないオプションです: ${arg}`);
    } else {
      files.push(arg);
    }
  }

  if (files.length === 0) {
    throw new CliError(`アーカイブのファイルを1つ以上指定してください。\n\n${USAGE}`);
  }
  return { files, top, includeReplies, out };
};

const readTweets = (files: readonly string[]): XTweet[] => {
  const tweets: XTweet[] = [];
  for (const file of files) {
    const path = resolve(process.cwd(), file);
    let source: string;
    try {
      source = readFileSync(path, 'utf8');
    } catch {
      throw new CliError(`ファイルを読めませんでした: ${path}`);
    }
    tweets.push(...extractTweets(parseArchiveJs(source)));
  }
  return tweets;
};

const writeCandidates = (
  out: string,
  payload: { sources: string[]; stats: FilterStats; candidates: CorpusCandidate[] },
): string => {
  const path = resolve(process.cwd(), out);
  // 反映は人間のレビューを挟む運用なので、コーパス本体への上書きは受け付けません。
  if (path === resolve(process.cwd(), CORPUS_PATH)) {
    throw new CliError(
      'corpus.json は直接上書きできません。--out には別のパスを指定して、候補をレビューしてから手で反映してください。',
    );
  }
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  return path;
};

const printSummary = (stats: FilterStats, candidates: readonly CorpusCandidate[], path: string) => {
  const lines = [
    '',
    '── 取り込み結果 ──',
    `読み込み件数    : ${stats.total}`,
    `RT除外          : ${stats.retweets}`,
    `リプライ除外    : ${stats.replies}`,
    `言語除外        : ${stats.lang}`,
    `長さ除外        : ${stats.length}`,
    `ノイズ除外      : ${stats.noise}`,
    `安全フィルタ除外: ${stats.blocked}`,
    `重複除外        : ${stats.duplicates}`,
    `候補件数        : ${candidates.length}(フィルタ通過 ${stats.kept} 件から上位を採用)`,
    '',
    `出力: ${path}`,
    '',
    '── 次にやること ──',
    '1. 候補ファイルを読み、口調がよく出ているものを選ぶ(他人の個人情報や、',
    '   本人発言として出てほしくない内容が無いかも必ず確認する)。',
    '2. 選んだ本文を data/kittan/corpus.json の sampleUtterances へ手で反映する',
    '   (このスクリプトは corpus.json を書き換えません)。',
    '3. styleNotes を実際の文体に合わせて見直す(同梱のシードは仮のテンションなので、',
    '   語尾・絵文字の量・一人称が実物とずれていないか必ず直す)。',
    '4. everydayConversation の返答例も、実際の文体に寄せて書き直す。',
    '5. vp test を実行して persona.test.ts が通ることを確認する。',
    '',
  ];
  console.log(lines.join('\n'));
};

const main = () => {
  const options = parseArgs(process.argv.slice(2));
  const tweets = readTweets(options.files);
  const { kept, stats } = filterCandidatesWithStats(tweets, {
    includeReplies: options.includeReplies,
  });
  const candidates = rankCandidates(kept, options.top);
  const path = writeCandidates(options.out, {
    sources: options.files,
    stats,
    candidates,
  });
  printSummary(stats, candidates, path);
};

try {
  main();
} catch (error) {
  if (error instanceof CliError || error instanceof XArchiveParseError) {
    console.error(error.message);
    process.exitCode = 1;
  } else {
    throw error;
  }
}
