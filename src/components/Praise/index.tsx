import React, { useCallback, useState } from 'react';
import styles from './styles.module.css';

type Props = {
  onIncrement: () => void;
  count: number;
  className?: string;
};

const Praise: React.FC<Props> = ({ onIncrement, count, className }: Props) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = useCallback(() => {
    onIncrement();
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 1500);
  }, [onIncrement]);

  return (
    <div className={[className, styles.praiseButton].join(' ')}>
      <button className={styles.button} onClick={handleClick}>
        {clicked ? 'ありがとう！' : 'ほめる'}
      </button>
      <div className={styles.balloon}>{count}</div>
    </div>
  );
};

export default Praise;
