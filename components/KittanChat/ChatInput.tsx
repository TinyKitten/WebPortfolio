'use client';
import { type KeyboardEvent, useState } from 'react';
import { MAX_MESSAGE_LENGTH } from '../../hooks/useKittanChat';

type Props = {
  onSend: (text: string) => void;
  disabled: boolean;
};

const ChatInput = ({ onSend, disabled }: Props) => {
  const [value, setValue] = useState('');

  const trimmedEmpty = value.trim().length === 0;

  const submit = () => {
    if (disabled || trimmedEmpty) {
      return;
    }
    onSend(value);
    setValue('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter' || event.shiftKey) {
      return;
    }
    // IME変換中のEnterは確定操作なので送信しない。
    if (event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229) {
      return;
    }
    event.preventDefault();
    submit();
  };

  return (
    <div className="shrink-0 border-t border-theme-text/10 p-3">
      <div className="flex items-end gap-2">
        <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={2}
          maxLength={MAX_MESSAGE_LENGTH}
          aria-label="きったんへのメッセージ"
          placeholder="きったんに話しかけてみよう"
          className="flex-1 resize-none rounded bg-transparent text-base text-theme-text placeholder:text-theme-text/50 outline-none focus:outline-none focus-visible:outline-none disabled:opacity-50"
        />
        <button
          type="button"
          aria-label="送信"
          disabled={disabled || trimmedEmpty}
          onClick={submit}
          className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-white ring-offset-2 focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-40"
        >
          送信
        </button>
      </div>
      <p className="mt-1 text-right text-xs text-theme-text/60">
        残り{MAX_MESSAGE_LENGTH - value.length}文字
      </p>
    </div>
  );
};

export default ChatInput;
