import { describe, expect, test } from 'vite-plus/test';
import { createRateLimiter } from './rateLimit';

/** テストから時刻を進められる簡易クロック。 */
const createClock = (start = 1_000_000) => {
  let current = start;
  return {
    now: () => current,
    advance: (ms: number) => {
      current += ms;
    },
  };
};

describe('createRateLimiter', () => {
  test('上限までは通し、超えたら止める', () => {
    const clock = createClock();
    const limiter = createRateLimiter({ limit: 3, windowMs: 60_000, now: clock.now });

    expect(limiter.check('a')).toEqual({
      allowed: true,
      remaining: 2,
      retryAfterMs: 0,
    });
    expect(limiter.check('a').remaining).toBe(1);
    expect(limiter.check('a').remaining).toBe(0);

    const blockedResult = limiter.check('a');
    expect(blockedResult.allowed).toBe(false);
    expect(blockedResult.retryAfterMs).toBe(60_000);
  });

  test('ウィンドウが経過すると再び通る(スライディング)', () => {
    const clock = createClock();
    const limiter = createRateLimiter({ limit: 2, windowMs: 1_000, now: clock.now });

    limiter.check('a');
    clock.advance(600);
    limiter.check('a');
    expect(limiter.check('a').allowed).toBe(false);

    // 1件目だけがウィンドウから外れる。
    clock.advance(401);
    expect(limiter.check('a').allowed).toBe(true);
    expect(limiter.check('a').allowed).toBe(false);
  });

  test('retryAfterMs は最も古い記録が外れるまでの時間', () => {
    const clock = createClock();
    const limiter = createRateLimiter({ limit: 1, windowMs: 10_000, now: clock.now });

    limiter.check('a');
    clock.advance(3_000);
    expect(limiter.check('a').retryAfterMs).toBe(7_000);
  });

  test('キーごとに独立して数える', () => {
    const clock = createClock();
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000, now: clock.now });

    expect(limiter.check('a').allowed).toBe(true);
    expect(limiter.check('b').allowed).toBe(true);
    expect(limiter.check('a').allowed).toBe(false);
  });

  test('reset で状態を消せる', () => {
    const clock = createClock();
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000, now: clock.now });

    limiter.check('a');
    limiter.check('b');
    limiter.reset('a');

    expect(limiter.check('a').allowed).toBe(true);
    expect(limiter.check('b').allowed).toBe(false);

    limiter.reset();
    expect(limiter.check('b').allowed).toBe(true);
  });

  test('maxKeys を超えても際限なくメモリを使わない', () => {
    const clock = createClock();
    const limiter = createRateLimiter({
      limit: 5,
      windowMs: 1_000,
      now: clock.now,
      maxKeys: 10,
    });

    for (let index = 0; index < 100; index += 1) {
      clock.advance(100);
      limiter.check(`key-${index}`);
    }

    // 直近のキーは引き続き数えられている。
    expect(limiter.check('key-99').remaining).toBe(3);
  });
});
