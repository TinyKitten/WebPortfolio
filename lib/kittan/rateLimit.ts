/**
 * インメモリのスライディングウィンドウ方式レートリミッター。
 *
 * 制約: 状態はプロセス内にしか無いため、Vercelのように複数のサーバーレスインスタンスが
 * 並列に立つ環境では「インスタンスごとの上限」になります。厳密な上限が必要になったら
 * Upstash Redis などの共有ストアに差し替えてください(インターフェースはそのまま使えます)。
 */

export type RateLimiterOptions = {
  /** ウィンドウ内に許可する最大リクエスト数。 */
  limit: number;
  /** ウィンドウの長さ(ミリ秒)。 */
  windowMs: number;
  /** 時刻の取得方法。テストから固定できます。 */
  now?: () => number;
  /** 保持するキーの上限(メモリ肥大の防止)。 */
  maxKeys?: number;
};

export type RateLimitResult = {
  allowed: boolean;
  /** このリクエストを含めた残り回数。 */
  remaining: number;
  /** 次に許可されるまでのミリ秒(許可された場合は0)。 */
  retryAfterMs: number;
};

export type RateLimiter = {
  check(key: string): RateLimitResult;
  reset(key?: string): void;
};

const DEFAULT_MAX_KEYS = 10_000;

export const createRateLimiter = (options: RateLimiterOptions): RateLimiter => {
  const { limit, windowMs } = options;
  const now = options.now ?? Date.now;
  const maxKeys = options.maxKeys ?? DEFAULT_MAX_KEYS;
  const hits = new Map<string, number[]>();

  const prune = (timestamps: number[], current: number): number[] => {
    const threshold = current - windowMs;
    let index = 0;
    while (index < timestamps.length && timestamps[index] <= threshold) {
      index += 1;
    }
    return index === 0 ? timestamps : timestamps.slice(index);
  };

  const evictIfNeeded = (current: number): void => {
    if (hits.size <= maxKeys) {
      return;
    }
    for (const [key, timestamps] of hits) {
      if (prune(timestamps, current).length === 0) {
        hits.delete(key);
      }
      if (hits.size <= maxKeys) {
        return;
      }
    }
    // まだ多いときは、Mapの挿入順(= 古い順)に落とします。
    for (const key of hits.keys()) {
      if (hits.size <= maxKeys) {
        return;
      }
      hits.delete(key);
    }
  };

  return {
    check(key) {
      const current = now();
      const timestamps = prune(hits.get(key) ?? [], current);

      if (timestamps.length >= limit) {
        hits.set(key, timestamps);
        const oldest = timestamps[0] ?? current;
        return {
          allowed: false,
          remaining: 0,
          retryAfterMs: Math.max(1, oldest + windowMs - current),
        };
      }

      timestamps.push(current);
      hits.set(key, timestamps);
      evictIfNeeded(current);

      return {
        allowed: true,
        remaining: limit - timestamps.length,
        retryAfterMs: 0,
      };
    },
    reset(key) {
      if (key === undefined) {
        hits.clear();
      } else {
        hits.delete(key);
      }
    },
  };
};
