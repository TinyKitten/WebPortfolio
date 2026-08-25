'use client';
import type { ChatRole } from '../../../lib/kittan/types';
import TinyKittenIcon from '../../TinyKittenIcon';

type Props = {
  role: ChatRole;
  content: string;
};

const BUBBLE_BASE =
  'rounded-2xl px-3 py-2 text-sm bp800:text-base whitespace-pre-wrap break-words opacity-0 animate-fade';

const MessageBubble = ({ role, content }: Props) => {
  if (role === 'user') {
    return (
      <div
        className={`max-w-[80%] shrink-0 self-end rounded-br-md bg-primary text-white ${BUBBLE_BASE}`}
      >
        {content}
      </div>
    );
  }

  return (
    <div className="flex max-w-[85%] shrink-0 items-end gap-2 self-start">
      <TinyKittenIcon className="h-8 w-8 shrink-0" aria-hidden />
      <div className={`rounded-bl-md bg-sub-bg text-theme-text ${BUBBLE_BASE}`}>{content}</div>
    </div>
  );
};

export default MessageBubble;
