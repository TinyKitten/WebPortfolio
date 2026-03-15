'use client';
import { useCallback } from 'react';
import { useFlag } from '../hooks/useFlag';

type Props = {
  onIncrement: () => void;
  count: string;
  className?: string;
};

const Praise = ({ onIncrement, count, className }: Props) => {
  const {
    value: clicked,
    toTrue: toClicked,
    toFalse: toNotClicked,
  } = useFlag();

  const handleClick = useCallback(() => {
    onIncrement();
    toClicked();
    setTimeout(() => {
      toNotClicked();
    }, 1500);
  }, [onIncrement, toClicked, toNotClicked]);

  return (
    <div className={`relative flex flex-col items-center bp800:flex-row ${className ?? ''}`}>
      <button
        onClick={handleClick}
        className="z-[1] appearance-none border-none min-w-[210px] h-12 cursor-pointer rounded-[1px] bg-primary text-[1.2rem] text-white shadow-[0_3px_6px_rgba(0,0,0,0.16)] transition-all hover:shadow-[0_3px_6px_rgba(0,0,0,0.25)] focus:outline-none"
      >
        {clicked ? 'ありがとう！' : 'ほめる'}
      </button>
      {count.length > 0 ? (
        <div className="praise-balloon">
          {count}
        </div>
      ) : null}
    </div>
  );
};

export default Praise;
