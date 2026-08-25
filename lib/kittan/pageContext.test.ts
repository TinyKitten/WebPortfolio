import { describe, expect, test } from 'vite-plus/test';
import {
  DEFAULT_KITTAN_PAGE,
  KITTAN_PAGE_CONTEXTS,
  KITTAN_PAGE_KEYS,
  isKittanPageKey,
  resolveKittanPageKey,
} from './pageContext';

describe('KITTAN_PAGE_CONTEXTS', () => {
  test('すべてのキーに文脈が定義されている', () => {
    for (const key of KITTAN_PAGE_KEYS) {
      const context = KITTAN_PAGE_CONTEXTS[key];
      expect(context.title.length).toBeGreaterThan(0);
      expect(context.summary.length).toBeGreaterThan(0);
      expect(context.talkingPoints.length).toBeGreaterThan(0);
    }
  });

  test('ページごとに違う指示になっている', () => {
    const summaries = KITTAN_PAGE_KEYS.map((key) => KITTAN_PAGE_CONTEXTS[key].summary);
    expect(new Set(summaries).size).toBe(summaries.length);
  });
});

describe('isKittanPageKey', () => {
  test.each([...KITTAN_PAGE_KEYS])('既知のキー %s を受け入れる', (key) => {
    expect(isKittanPageKey(key)).toBe(true);
  });

  test.each([
    ['未知の文字列', 'about'],
    ['数値', 1],
    ['null', null],
    ['未指定', undefined],
  ])('%s は受け入れない', (_label, value) => {
    expect(isKittanPageKey(value)).toBe(false);
  });
});

describe('resolveKittanPageKey', () => {
  test.each([
    ['/', 'home'],
    ['', 'home'],
    ['/works/trainlcd', 'trainlcd'],
    ['/works/trainlcd/', 'trainlcd'],
    ['/works/trainlcd/detail', 'trainlcd'],
    ['/works/trainlcd?utm_source=x', 'trainlcd'],
    ['/works/trainlcd#access', 'trainlcd'],
  ])('%s は %s になる', (pathname, expected) => {
    expect(resolveKittanPageKey(pathname)).toBe(expected);
  });

  test.each(['/works', '/works/trainlcdx', '/unknown-page'])(
    '未知のパス %s は既定のページに落とす',
    (pathname) => {
      expect(resolveKittanPageKey(pathname)).toBe(DEFAULT_KITTAN_PAGE);
    },
  );
});
