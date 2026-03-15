import type { KeyboardEvent } from 'react';

type Props = {
  text: string;
  onClick?: () => void;
  invert?: boolean;
};

const Tag = ({ text, onClick, invert = false }: Props) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`flex rounded-full border-[1.5px] px-4 py-2 ${
        invert
          ? 'border-theme-bg bg-primary'
          : 'border-primary/75 bg-theme-bg'
      }`}
    >
      <span className={invert ? 'text-white' : 'text-primary'}>#{text}</span>
    </div>
  );
};

export default Tag;
