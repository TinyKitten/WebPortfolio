'use client';
import { useEffect, useState } from 'react';
import { useKittanChat } from '../../hooks/useKittanChat';
import TinyKittenIcon from '../TinyKittenIcon';
import ChatInput from './ChatInput';
import MessageList from './MessageList';

const KittanChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const waitingSeconds =
    retryAt !== undefined && now < retryAt ? Math.ceil((retryAt - now) / 1000) : 0;
  const sendDisabled = status === 'sending' || waitingSeconds > 0;

  const handleSend = (text: string) => {
    void send(text);
  };

  const handleRetry = () => {
    void retry();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((previous) => !previous);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed right-5 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-[9998] flex h-[min(60vh,480px)] w-[min(calc(100vw-2.5rem),400px)] flex-col overflow-hidden origin-bottom-right rounded-lg bg-box-bg opacity-0 drop-shadow-[0_3px_3px_rgba(0,0,0,0.16)] animate-genie">
          <div className="flex shrink-0 items-center gap-2 border-b border-theme-text/10 px-3 py-2">
            <TinyKittenIcon className="h-6 w-6 shrink-0" aria-hidden />
            <p className="flex-1 text-sm font-bold text-heading-text">きったんとおしゃべり</p>
            {messages.length > 0 && (
              <button
                type="button"
                onClick={reset}
                className="rounded px-1 text-xs text-theme-text/70 underline focus-visible:ring-2 focus-visible:ring-primary"
              >
                会話をリセット
              </button>
            )}
            <button
              type="button"
              aria-label="閉じる"
              onClick={handleClose}
              className="rounded px-2 text-lg leading-none text-theme-text/70 focus-visible:ring-2 focus-visible:ring-primary"
            >
              ×
            </button>
          </div>
          <p className="shrink-0 px-3 pt-1 text-[10px] text-theme-text/70">
            AIによる自動応答です。内容が正確でないことがあります
          </p>
          <MessageList messages={messages} sending={status === 'sending'} />
          {error !== null && (
            <div
              role="alert"
              className="mx-3 flex shrink-0 flex-wrap items-center gap-2 rounded border border-theme-text/20 px-3 py-2 text-xs text-theme-text"
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
      )}
      <button
        type="button"
        aria-label={isOpen ? 'きったんとおしゃべりを閉じる' : 'きったんとおしゃべりを開く'}
        aria-expanded={isOpen}
        onClick={handleToggle}
        className="fixed right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-[9998] rounded-full transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <TinyKittenIcon className="h-14 w-14 drop-shadow-[0_3px_3px_rgba(0,0,0,0.3)]" aria-hidden />
      </button>
    </>
  );
};

export default KittanChatWidget;
