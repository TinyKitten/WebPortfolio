'use client';
import { useCallback, useRef, useState } from 'react';
import { DEFAULT_KITTAN_PAGE, type KittanPageKey } from '../lib/kittan/pageContext';
import type { ChatMessage } from '../lib/kittan/types';

export type KittanChatStatus = 'idle' | 'sending';

export type KittanChatError = {
  /** 表示用文言。APIの error.message か、ネットワークエラー時のUI側定型文 */
  message: string;
  /** true のとき「再試行」UIを出す(429/500/503/ネットワークエラー) */
  retryable: boolean;
  /** retry-after 由来。この時刻(epoch ms)まで送信を無効化する。無ければ undefined */
  retryAt?: number;
};

export type UseKittanChatResult = {
  /** 表示すべき会話履歴(blocked_content のお断り文も assistant として含まれる) */
  messages: ChatMessage[];
  status: KittanChatStatus;
  /** 直近の失敗。次の送信成功でクリアされる */
  error: KittanChatError | null;
  /** 入力を trim して user 発言として積み、APIを呼ぶ。空文字・sending中は何もしない */
  send: (text: string) => Promise<void>;
  /** 直前に失敗した user 発言を再送する。失敗が無ければ何もしない */
  retry: () => Promise<void>;
  /** 会話を全消去して初期状態に戻す */
  reset: () => void;
};

const MAX_MESSAGES = 20;
/** 1メッセージの最大文字数(APIの制約。入力欄側でも同じ値を使う)。 */
export const MAX_MESSAGE_LENGTH = 500;
const NETWORK_ERROR_MESSAGE = '通信がうまくいかなかったみたい。もう一度試してみてね🙏';

type ApiErrorBody = { error?: { code?: unknown; message?: unknown } };

/** エラーボディの message は信用せず、文字列のときだけ採用する。 */
const pickMessage = (body: unknown): string => {
  const message = (body as ApiErrorBody | null)?.error?.message;
  return typeof message === 'string' && message.length > 0 ? message : NETWORK_ERROR_MESSAGE;
};

const pickCode = (body: unknown): string | undefined => {
  const code = (body as ApiErrorBody | null)?.error?.code;
  return typeof code === 'string' ? code : undefined;
};

/** retry-after(秒)が数値として読めるときだけ epoch ms に変換する。 */
const parseRetryAt = (headerValue: string | null): number | undefined => {
  if (headerValue === null) {
    return undefined;
  }
  const seconds = Number(headerValue);
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return undefined;
  }
  return Date.now() + seconds * 1000;
};

/** APIは20件までしか受け付けないので、交互ルールを崩さないよう先頭から2件単位で削る。 */
const buildPayload = (history: ChatMessage[]): ChatMessage[] => {
  let payload = history;
  while (payload.length > MAX_MESSAGES) {
    payload = payload.slice(2);
  }
  return payload;
};

/**
 * @param page 相手がいま見ているページ。サーバーがページ別のシステムプロンプトを選ぶのに使います。
 */
export const useKittanChat = (page: KittanPageKey = DEFAULT_KITTAN_PAGE): UseKittanChatResult => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<KittanChatStatus>('idle');
  const [error, setError] = useState<KittanChatError | null>(null);

  /** reset() 後に遅れて届いたレスポンスを捨てるための世代カウンタ。 */
  const generationRef = useRef(0);
  /** state 更新の遅延に依存しない多重送信ガード。 */
  const sendingRef = useRef(false);

  const post = useCallback(
    async (history: ChatMessage[]): Promise<void> => {
      const generation = generationRef.current;
      sendingRef.current = true;
      setStatus('sending');
      setError(null);

      let nextMessages: ChatMessage[] | null = null;
      let nextError: KittanChatError | null = null;

      try {
        const res = await fetch('/api/kittan-chat', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          // page はサーバー側でページ別のシステムプロンプトを選ぶために使う。
          body: JSON.stringify({ messages: buildPayload(history), page }),
        });
        const body: unknown = await res.json();

        if (res.status === 200) {
          const reply = (body as { reply?: unknown } | null)?.reply;
          if (typeof reply === 'string' && reply.length > 0) {
            nextMessages = [...history, { role: 'assistant', content: reply }];
          } else {
            nextError = { message: NETWORK_ERROR_MESSAGE, retryable: true };
          }
        } else if (res.status === 400 && pickCode(body) === 'blocked_content') {
          // お断り文はエラーではなく、きったんの発言として履歴に残す。
          nextMessages = [...history, { role: 'assistant', content: pickMessage(body) }];
        } else if (res.status === 400) {
          nextError = { message: pickMessage(body), retryable: false };
        } else if (res.status === 429) {
          nextError = {
            message: pickMessage(body),
            retryable: true,
            retryAt: parseRetryAt(res.headers.get('retry-after')),
          };
        } else if (res.status === 500 || res.status === 503) {
          nextError = { message: pickMessage(body), retryable: true };
        } else {
          nextError = { message: NETWORK_ERROR_MESSAGE, retryable: true };
        }
      } catch {
        nextError = { message: NETWORK_ERROR_MESSAGE, retryable: true };
      }

      // reset() を挟んでいたら、この結果はもう表示してはいけない。
      if (generationRef.current !== generation) {
        return;
      }

      if (nextMessages !== null) {
        setMessages(nextMessages);
      }
      setError(nextError);
      sendingRef.current = false;
      setStatus('idle');
    },
    [page],
  );

  const send = useCallback(
    async (text: string): Promise<void> => {
      if (sendingRef.current) {
        return;
      }
      const trimmed = text.trim();
      if (trimmed.length === 0) {
        return;
      }
      // UI側でも制限しているが、APIの400を避けるための保険。
      const content = trimmed.slice(0, MAX_MESSAGE_LENGTH);
      const next: ChatMessage[] = [...messages, { role: 'user', content }];
      setMessages(next);
      await post(next);
    },
    [messages, post],
  );

  const retry = useCallback(async (): Promise<void> => {
    if (sendingRef.current || error === null || !error.retryable) {
      return;
    }
    if (messages[messages.length - 1]?.role !== 'user') {
      return;
    }
    // 失敗した user 発言は既に履歴にあるので積み直さない。
    await post(messages);
  }, [error, messages, post]);

  const reset = useCallback((): void => {
    generationRef.current += 1;
    sendingRef.current = false;
    setMessages([]);
    setError(null);
    setStatus('idle');
  }, []);

  return { messages, status, error, send, retry, reset };
};
