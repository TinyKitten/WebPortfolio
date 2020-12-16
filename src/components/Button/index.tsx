import React from 'react';
import styles from './styles.module.css';

type Props = {
  color?: string;
  text: string;
  className?: string;
};

const Button: React.FC<Props> = ({
  color = '#008ffe',
  text,
  className,
}: Props) => (
  <button
    style={{ backgroundColor: color }}
    className={[className, styles.button].join(' ')}
  >
    {text}
  </button>
);

export default Button;
