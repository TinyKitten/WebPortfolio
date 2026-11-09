'use client';
import { usePathname } from 'next/navigation';
import {
  type AnimationEvent,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useKittanChat } from '../../hooks/useKittanChat';
import { resolveKittanPageKey } from '../../lib/kittan/pageContext';
import TinyKittenIcon from '../TinyKittenIcon';
import ChatInput from './ChatInput';
import MessageList from './MessageList';

/** 退場アニメーションを見せてからアンマウントするための状態。 */
type Phase = 'closed' | 'open' | 'closing';

/** animationend が来ない環境(タブ非表示など)でも必ず閉じるための保険。 */
const CLOSING_FALLBACK_MS = 400;

type PanelSize = { width: number; height: number };
type ResizeDrag = PanelSize & { pointerId: number; x: number; y: number };

const MIN_PANEL_WIDTH = 320;
const MIN_PANEL_HEIGHT = 240;
const RESIZE_STEP = 24;

const KittanChatWidget = () => {
  const [phase, setPhase] = useState<Phase>('closed');
  const [maximized, setMaximized] = useState(false);
  const [panelSize, setPanelSize] = useState<PanelSize>();
  const panelRef = useRef<HTMLDivElement>(null);
  const resizeDrag = useRef<ResizeDrag | null>(null);
  const didResize = useRef(false);
  // 全ページに出しているので、いま開いているページに合わせた指示をサーバーへ伝える。
  const page = resolveKittanPageKey(usePathname() ?? '/');
  const { messages, status, error, send, retry, reset } = useKittanChat(page);
  const [now, setNow] = useState(() => Date.now());

  const retryAt = error?.retryAt;

  useEffect(() => {
    const panel = panelRef.current;
    const viewport = window.visualViewport;
    if (!maximized || phase === 'closed' || !panel || !viewport) {
      return;
    }

    // ソフトウェアキーボードが表示されても、入力欄を見える範囲に収める。
    const updateViewport = () => {
      panel.style.setProperty('--chat-viewport-top', `${viewport.offsetTop}px`);
      panel.style.setProperty('--chat-viewport-height', `${viewport.height}px`);
    };
    updateViewport();
    viewport.addEventListener('resize', updateViewport);
    viewport.addEventListener('scroll', updateViewport);
    return () => {
      viewport.removeEventListener('resize', updateViewport);
      viewport.removeEventListener('scroll', updateViewport);
      panel.style.removeProperty('--chat-viewport-top');
      panel.style.removeProperty('--chat-viewport-height');
    };
  }, [maximized, phase]);

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
    if (phase !== 'open') {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPhase('closing');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'closing') {
      return;
    }
    const timer = setTimeout(() => {
      setPhase('closed');
    }, CLOSING_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, [phase]);

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
    setPhase((previous) => (previous === 'open' ? 'closing' : previous));
  };

  // 退場中にもう一度押されたら、そのまま生え直す。
  const handleToggle = () => {
    if (phase === 'open') {
      handleClose();
    } else {
      setMaximized(false);
      setPhase('open');
    }
  };

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    // 吹き出しなど子要素のアニメーション終了がバブリングしてくるので自身の分だけ拾う。
    if (event.target === event.currentTarget && phase === 'closing') {
      setPhase('closed');
    }
  };

  const handleResizeStart = (event: PointerEvent<HTMLButtonElement>) => {
    const panel = panelRef.current;
    if (event.button !== 0 || !event.isPrimary || !panel || phase !== 'open') {
      return;
    }

    resizeDrag.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      width: panel.offsetWidth,
      height: panel.offsetHeight,
    };
    didResize.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleResizeMove = (event: PointerEvent<HTMLButtonElement>) => {
    const drag = resizeDrag.current;
    if (!drag || event.pointerId !== drag.pointerId || phase !== 'open') {
      return;
    }
    if (event.clientX === drag.x && event.clientY === drag.y && !didResize.current) {
      return;
    }
    didResize.current = true;
    setPanelSize({
      width: Math.max(MIN_PANEL_WIDTH, drag.width + drag.x - event.clientX),
      height: Math.max(MIN_PANEL_HEIGHT, drag.height + drag.y - event.clientY),
    });
  };

  const handleResizeKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    const panel = panelRef.current;
    if (!panel || phase !== 'open') {
      return;
    }

    let width = panel.offsetWidth;
    let height = panel.offsetHeight;
    switch (event.key) {
      case 'ArrowLeft':
        width += RESIZE_STEP;
        break;
      case 'ArrowRight':
        width -= RESIZE_STEP;
        break;
      case 'ArrowUp':
        height += RESIZE_STEP;
        break;
      case 'ArrowDown':
        height -= RESIZE_STEP;
        break;
      default:
        return;
    }
    event.preventDefault();
    setPanelSize({
      width: Math.max(MIN_PANEL_WIDTH, width),
      height: Math.max(MIN_PANEL_HEIGHT, height),
    });
  };

  return (
    <>
      {phase !== 'closed' && (
        <div
          ref={panelRef}
          onAnimationEnd={handleAnimationEnd}
          style={
            {
              '--chat-width': panelSize && `${panelSize.width}px`,
              '--chat-height': panelSize && `${panelSize.height}px`,
            } as CSSProperties
          }
          className={`fixed right-5 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-[9998] flex h-[min(60vh,480px)] w-[min(calc(100vw-2.5rem),400px)] origin-bottom-right flex-col overflow-hidden overscroll-contain rounded-lg bg-box-bg drop-shadow-[0_3px_3px_rgba(0,0,0,0.16)] bp800:h-[var(--chat-height,min(60vh,480px))] bp800:max-h-[calc(100dvh-9.25rem-env(safe-area-inset-bottom))] bp800:w-[min(var(--chat-width,400px),calc(100vw-2.5rem))] ${
            maximized
              ? 'max-bp800:top-[var(--chat-viewport-top,0px)] max-bp800:right-0 max-bp800:bottom-auto max-bp800:z-[10000] max-bp800:h-[var(--chat-viewport-height,100dvh)] max-bp800:w-full max-bp800:rounded-none max-bp800:pt-[env(safe-area-inset-top)] max-bp800:pr-[env(safe-area-inset-right)] max-bp800:pb-[env(safe-area-inset-bottom)] max-bp800:pl-[env(safe-area-inset-left)]'
              : ''
          } ${phase === 'closing' ? 'animate-genie-out' : 'opacity-0 animate-genie'}`}
        >
          <div className="flex shrink-0 items-center gap-2 border-b border-theme-text/10 px-3 py-2">
            <button
              type="button"
              aria-label="チャットのサイズを調整。矢印キーで変更し、Enterキーで元に戻す"
              aria-keyshortcuts="ArrowUp ArrowDown ArrowLeft ArrowRight"
              title="ドラッグでサイズ変更、クリックで元に戻す"
              onPointerDown={handleResizeStart}
              onPointerMove={handleResizeMove}
              onLostPointerCapture={() => {
                resizeDrag.current = null;
              }}
              onKeyDown={handleResizeKeyDown}
              onClick={(event) => {
                if (event.detail === 0 || !didResize.current) {
                  setPanelSize(undefined);
                }
              }}
              className="hidden size-7 shrink-0 touch-none cursor-nwse-resize place-items-center rounded text-theme-text/70 hover:bg-primary/10 hover:text-primary focus-visible:bg-primary/10 focus-visible:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset motion-safe:transition-colors bp800:grid"
            >
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="m3 8 5-5M3 13 13 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
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
              aria-label={maximized ? 'チャットを元のサイズに戻す' : 'チャットを最大化'}
              onClick={() => setMaximized(!maximized)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded text-theme-text/70 focus-visible:ring-2 focus-visible:ring-primary bp800:hidden"
            >
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d={maximized ? 'M4 9h5V4m11 11h-5v5' : 'M9 4H4v5m11 11h5v-5'}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="閉じる"
              onClick={handleClose}
              className="rounded px-2 text-lg leading-none text-theme-text/70 focus-visible:ring-2 focus-visible:ring-primary bp800:grid bp800:size-7 bp800:shrink-0 bp800:place-items-center bp800:px-0"
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
      {/* 押している間は下端を軸にきゅっと縮こまり、離すとバネのイージングで少し弾んで戻る。 */}
      <button
        type="button"
        aria-label={
          phase === 'open' ? 'きったんとおしゃべりを閉じる' : 'きったんとおしゃべりを開く'
        }
        aria-expanded={phase === 'open'}
        onClick={handleToggle}
        className={`group fixed right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-[9998] flex h-14 w-14 origin-bottom cursor-pointer items-center justify-center rounded-2xl rounded-br-[4px] bg-primary shadow-[0_4px_12px_rgba(0,0,0,0.35)] transition-[transform,translate,scale,rotate,box-shadow] duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 active:scale-x-[0.92] active:scale-y-[0.82] active:shadow-[0_1px_4px_rgba(0,0,0,0.35)] active:duration-240 active:ease-out motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
          maximized && phase !== 'closed' ? 'max-bp800:hidden' : ''
        }`}
      >
        {/* アイコンの円はボタンと同色に溶け、白いロゴだけが吹き出し型のボタンに載って見える。 */}
        <TinyKittenIcon
          className="h-10 w-10 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-active:scale-90 group-active:duration-240 group-active:ease-out motion-reduce:transition-none"
          aria-hidden
        />
      </button>
    </>
  );
};

export default KittanChatWidget;
