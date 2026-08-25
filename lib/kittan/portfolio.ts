import { TRIVIA_ITEMS } from '../../constants/trivia';
import resumeFixture from '../../fixtures/stories/resume.stories.json';
import trainlcdFixture from '../../fixtures/stories/works/trainlcd.stories.json';
import type { PortfolioFacts } from './types';

/**
 * ポートフォリオ本体が表示しているのと同じデータから、
 * プロンプトに載せる事実情報を組み立てます(新しい事実をここで作らないこと)。
 */

const PROFILE: string[] = [
  '本名やハンドルネームは TinyKitten(タイニーキトゥン)。「きったん」と呼ばれることが多い。',
  '東京都練馬区在住のフリーランスのソフトウェアエンジニア兼デザイナー。',
  '2018年12月1日に屋号「TinyKitten」として開業した。',
  'Web・モバイルの両方を手がけ、React / React Native / TypeScript / Firebase などをよく使う。デザインも自分でできる。',
  '個人開発として電車の行き先案内表示器アプリ「TrainLCD」を2019年から開発・運営し続けている。',
  'TrainLCDは累計6万DL超、レビュー500件以上で平均評価4以上。iOSを中心に使われている。',
  'TrainLCDのアプリ本体はReact Native(TypeScript)製。駅データを返すStationAPIは2026年8月にPure Rustで書き直し、データベースへの依存をなくしてCloudflare Workersのみで動いている(それ以前はRust製のgRPCサーバー+データベース構成だった)。',
  'シンボルはギリシャ文字のΑ(アルファ)を二つ重ねたもの。モットーは「The Combination of Alpha」。',
  '猫が大好きで、屋号の由来も「小さな子猫」。ブタさんも好きで、休日は都内のブタさんカフェに通っている。',
];

const formatYearRange = (startAtFullYear: number, endAtFullYear: number | null): string =>
  endAtFullYear === null
    ? `${startAtFullYear}年〜現在`
    : `${startAtFullYear}年〜${endAtFullYear}年`;

const formatMonthRange = (startAt: string, finishedAt: string | null): string =>
  finishedAt === null ? startAt : `${startAt}〜${finishedAt}`;

let cached: PortfolioFacts | undefined;

/** プロンプト用のポートフォリオ事実情報を返します(初回のみ組み立て)。 */
export const getPortfolioFacts = (): PortfolioFacts => {
  cached ??= {
    profile: PROFILE,
    trivia: TRIVIA_ITEMS.map((item) => ({
      subject: item.subject,
      description: item.description,
      tags: item.tags,
    })),
    resume: resumeFixture.map((item) => ({
      period: formatYearRange(item.startAtFullYear, item.endAtFullYear),
      companyName: item.companyName,
      description: item.description,
    })),
    trainlcd: trainlcdFixture
      .slice()
      .sort((a, b) => a.startAt.localeCompare(b.startAt))
      .map((item) => ({
        period: formatMonthRange(item.startAt, item.finishedAt),
        title: item.title.replace(/\n/g, ' '),
        description: item.description,
      })),
  };
  return cached;
};
