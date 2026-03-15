import type { SyntheticEvent } from 'react';

type Props = {
  color?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (event: SyntheticEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const Button = ({ color, children, className, onClick, disabled }: Props) => (
  <button
    style={{ backgroundColor: color ?? 'var(--color-primary)' }}
    className={`appearance-none border-none min-w-[210px] h-12 cursor-pointer rounded-[1px] text-[1.2rem] text-white shadow-[0_3px_6px_rgba(0,0,0,0.16)] transition-all duration-250 hover:shadow-[0_3px_6px_rgba(0,0,0,0.25)] focus:outline-none ${className ?? ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
