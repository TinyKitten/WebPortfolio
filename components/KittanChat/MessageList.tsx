'use client';
import { useEffect, useRef } from 'react';
import type { ChatMessage } from '../../lib/kittan/types';
import TinyKittenIcon from '../TinyKittenIcon';
import MessageBubble from './MessageBubble';

type Props = {
  messages: ChatMessage[];
  sending: boolean;
};

/** 履歴には積まない表示専用の初回挨拶。 */
const GREETING = 'やっほー、きったんだよ🐈 ぼくのこと、なんでも聞いてね！';

/** この距離より下までスクロールしていれば「最下部を見ている」とみなす。 */
const AT_BOTTOM_THRESHOLD = 80;

const MessageList = ({ messages, sending }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const atBottomRef = useRef(true);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container === null) {
      return;
    }
    atBottomRef.current =
      container.scrollHeight - container.scrollTop - container.clientHeight < AT_BOTTOM_THRESHOLD;
  };

  useEffect(() => {
    const container = containerRef.current;
    // ユーザーが過去のやりとりを読み返している間は追従しない。
    if (container === null || !atBottomRef.current) {
      return;
    }
    container.scrollTop = container.scrollHeight;
  }, [messages.length, sending]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      aria-live="polite"
      className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4"
    >
      <MessageBubble role="assistant" content={GREETING} />
      {/* 履歴は末尾への追記しか起きないので index をキーにしてよい。 */}
      {messages.map((message, index) => (
        <MessageBubble key={index} role={message.role} content={message.content} />
      ))}
      {sending && (
        <div className="flex max-w-[85%] shrink-0 items-end gap-2 self-start">
          <TinyKittenIcon className="h-8 w-8 shrink-0" aria-hidden />
          <div
            role="img"
            aria-label="きったんが考え中"
            className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-sub-bg px-3 py-3"
          >
            <span className="h-2 w-2 animate-bounce rounded-full bg-theme-text/50 [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-theme-text/50 [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-theme-text/50" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
