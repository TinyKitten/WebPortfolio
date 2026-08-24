import rawCorpus from '../../data/kittan/corpus.json';
import type { KittanCorpus } from './types';

/** コーパスの内容が壊れているときに投げるエラー。 */
export class KittanCorpusError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'KittanCorpusError';
  }
}

const asStringArray = (value: unknown, field: string): string[] => {
  if (!Array.isArray(value)) {
    throw new KittanCorpusError(`corpus.json: ${field} は配列である必要があります。`);
  }
  return value.map((entry, index) => {
    if (typeof entry !== 'string' || entry.trim().length === 0) {
      throw new KittanCorpusError(
        `corpus.json: ${field}[${index}] は空でない文字列である必要があります。`,
      );
    }
    return entry.trim();
  });
};

/**
 * corpus.json を検証して型付きの値にします。
 * 静的インポートしたJSONを渡す前提ですが、テストから任意の値も渡せます。
 */
export const parseKittanCorpus = (value: unknown): KittanCorpus => {
  if (typeof value !== 'object' || value === null) {
    throw new KittanCorpusError('corpus.json: オブジェクトである必要があります。');
  }

  const record = value as Record<string, unknown>;
  const everydayRaw = record.everydayConversation;
  if (!Array.isArray(everydayRaw)) {
    throw new KittanCorpusError('corpus.json: everydayConversation は配列である必要があります。');
  }

  const everydayConversation = everydayRaw.map((entry, index) => {
    if (typeof entry !== 'object' || entry === null) {
      throw new KittanCorpusError(
        `corpus.json: everydayConversation[${index}] はオブジェクトである必要があります。`,
      );
    }
    const pair = entry as Record<string, unknown>;
    if (
      typeof pair.user !== 'string' ||
      pair.user.trim().length === 0 ||
      typeof pair.kittan !== 'string' ||
      pair.kittan.trim().length === 0
    ) {
      throw new KittanCorpusError(
        `corpus.json: everydayConversation[${index}] は user / kittan の文字列を持つ必要があります。`,
      );
    }
    return { user: pair.user.trim(), kittan: pair.kittan.trim() };
  });

  return {
    styleNotes: asStringArray(record.styleNotes, 'styleNotes'),
    sampleUtterances: asStringArray(record.sampleUtterances, 'sampleUtterances'),
    everydayConversation,
  };
};

let cached: KittanCorpus | undefined;

/**
 * リポジトリに同梱したコーパスを返します(初回のみ検証)。
 * 実データの更新方法は lib/kittan/README.md を参照してください。
 */
export const getKittanCorpus = (): KittanCorpus => {
  cached ??= parseKittanCorpus(rawCorpus);
  return cached;
};
