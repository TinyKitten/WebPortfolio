'use client';
import { useEffect, useState } from 'react';
import { useKittanChat } from '../../../hooks/useKittanChat';
import { useScreenVisibility } from '../../../hooks/useScreenVisibility';
import TitlePostit from '../../TitlePostit';
import ChatInput from './ChatInput';
import MessageList from './MessageList';

const KittanChatScreen = () => {
  const { visible, ref } = useScreenVisibility();
  const { messages, status, error, send, retry, reset } = useKittanChat();
  const [now, setNow] = useState(() => Date.now());

  const retryAt = error?.retryAt;

  useEffect(() => {
    if (retryAt === undefined) {
      return;
    }
    setNow(Date.now());
    // retry-after を待っている間だけ秒読みを回し、待ち時間が過ぎたら止める。
    const timer = setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (current >= retryAt) {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [retryAt]);

  const waitingSeconds =
    retryAt !== undefined && now < retryAt ? Math.ceil((retryAt - now) / 1000) : 0;
  const sendDisabled = status === 'sending' || waitingSeconds > 0;

  const handleSend = (text: string) => {
    void send(text);
  };

  const handleRetry = () => {
    void retry();
  };

  return (
    <section ref={ref} className="relative min-h-[calc(100vh-48px)] overflow-hidden">
      {visible && <TitlePostit title="きったんと" subtitle="おしゃべり" />}
      {visible && (
        <div className="mt-[210px] flex flex-col items-center px-4 pb-16 opacity-0 animate-fade-delayed">
          <div className="w-full max-w-[640px] overflow-hidden rounded-lg bg-box-bg drop-shadow-[0_3px_3px_rgba(0,0,0,0.16)]">
            <MessageList messages={messages} sending={status === 'sending'} />
            {error !== null && (
              <div
                role="alert"
                className="mx-3 flex flex-wrap items-center gap-2 rounded border border-theme-text/20 px-3 py-2 text-xs text-theme-text"
              >
                <span className="flex-1">{error.message}</span>
                {waitingSeconds > 0 && <span>あと{waitingSeconds}秒待ってね</span>}
                {error.retryable && (
                  <button
                    type="button"
                    onClick={handleRetry}
                    disabled={sendDisabled}
                    className="rounded border border-theme-text/30 px-2 py-1 font-bold text-primary disabled:opacity-40"
                  >
                    再試行
                  </button>
                )}
              </div>
            )}
            <ChatInput onSend={handleSend} disabled={sendDisabled} />
          </div>
          <p className="mt-2 max-w-[640px] text-xs text-theme-text/70">
            AIによる自動応答です。内容が正確でないことがあります
          </p>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={reset}
              className="mt-4 rounded px-2 py-1 text-xs text-theme-text/70 underline focus-visible:ring-2 focus-visible:ring-primary"
            >
              会話をリセット
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default KittanChatScreen;
