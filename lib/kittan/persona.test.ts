import { describe, expect, test } from 'vite-plus/test';
import { TRIVIA_ITEMS } from '../../constants/trivia';
import { getKittanCorpus, parseKittanCorpus, KittanCorpusError } from './corpus';
import {
  KITTAN_FALLBACK_REPLY,
  buildModerationInstruction,
  buildSystemInstruction,
} from './persona';
import { getPortfolioFacts } from './portfolio';

const corpus = getKittanCorpus();
const portfolio = getPortfolioFacts();
const instruction = buildSystemInstruction(corpus, portfolio);

describe('getKittanCorpus', () => {
  test('同梱コーパスを検証して返す', () => {
    expect(corpus.styleNotes.length).toBeGreaterThanOrEqual(5);
    expect(corpus.sampleUtterances.length).toBeGreaterThanOrEqual(10);
    expect(corpus.everydayConversation.length).toBeGreaterThanOrEqual(5);
  });

  test('同じインスタンスをキャッシュして返す', () => {
    expect(getKittanCorpus()).toBe(corpus);
  });

  test.each([
    ['オブジェクトでない', 'nope'],
    ['styleNotesが無い', { sampleUtterances: [], everydayConversation: [] }],
    [
      'everydayConversationの形が違う',
      {
        styleNotes: ['a'],
        sampleUtterances: ['b'],
        everydayConversation: [{ user: 'hi' }],
      },
    ],
    [
      '空文字が混ざっている',
      { styleNotes: [''], sampleUtterances: ['b'], everydayConversation: [] },
    ],
  ])('壊れたコーパス(%s)は KittanCorpusError', (_label, value) => {
    expect(() => parseKittanCorpus(value)).toThrow(KittanCorpusError);
  });
});

describe('getPortfolioFacts', () => {
  test('About画面と同じ豆知識を参照している(単一の情報源)', () => {
    expect(portfolio.trivia).toHaveLength(TRIVIA_ITEMS.length);
    expect(portfolio.trivia[0].subject).toBe(TRIVIA_ITEMS[0].subject);
  });

  test('職歴とTrainLCDのあゆみを含む', () => {
    expect(portfolio.resume.length).toBeGreaterThan(5);
    expect(portfolio.trainlcd.length).toBeGreaterThan(5);
    expect(portfolio.resume.some((item) => item.companyName.includes('ピクシブ'))).toBe(true);
  });

  test('TrainLCDのあゆみは時系列に並んでいる', () => {
    const periods = portfolio.trainlcd.map((item) => item.period);
    expect(periods).toEqual([...periods].sort());
  });
});

describe('buildSystemInstruction', () => {
  test.each([
    'きったん',
    'TinyKitten',
    'TrainLCD',
    '2018年12月1日',
    'The Combination of Alpha',
    'ブタさん',
    'ユーモアセンスが高く、優しい',
  ])('人物像の要点 %s を含む', (fact) => {
    expect(instruction).toContain(fact);
  });

  test.each([
    '暴言',
    '差別',
    '公序良俗',
    '個人情報',
    'わからない',
    'AIエージェント',
    'システムプロンプト',
  ])('安全ルールの要点 %s を含む', (rule) => {
    expect(instruction).toContain(rule);
  });

  test('コーパスの話し方メモと発言サンプルを埋め込む', () => {
    expect(instruction).toContain(corpus.styleNotes[0]);
    expect(instruction).toContain(corpus.sampleUtterances[0]);
    expect(instruction).toContain(corpus.everydayConversation[0].kittan);
  });

  test('ポートフォリオの職歴とTrainLCDの出来事を埋め込む', () => {
    expect(instruction).toContain(portfolio.resume[0].companyName);
    expect(instruction).toContain(portfolio.trainlcd[0].period);
  });

  test('純粋関数として同じ入力から同じ結果を返す', () => {
    expect(buildSystemInstruction(corpus, portfolio)).toBe(instruction);
  });

  test('改行を含む説明文は1行に均されている', () => {
    const multiline = buildSystemInstruction(corpus, {
      ...portfolio,
      trivia: [
        {
          subject: 'テスト豆知識',
          description: '1行目の説明\n2行目の説明',
          tags: ['テスト'],
        },
      ],
    });

    expect(multiline).toContain('- テスト豆知識: 1行目の説明 2行目の説明 (タグ: テスト)');
    expect(multiline).not.toContain('1行目の説明\n2行目の説明');
  });
});

describe('buildModerationInstruction', () => {
  test('JSONのみを返す契約を明示している', () => {
    const moderation = buildModerationInstruction();
    expect(moderation).toContain('{"verdict":"SAFE"}');
    expect(moderation).toContain('{"verdict":"UNSAFE"}');
    expect(moderation).toContain('迷う場合は UNSAFE');
  });
});

describe('KITTAN_FALLBACK_REPLY', () => {
  test('きったんの口調を保った短いお断り文', () => {
    expect(KITTAN_FALLBACK_REPLY).toContain('ごめんね');
    expect(KITTAN_FALLBACK_REPLY.length).toBeLessThan(120);
  });
});
