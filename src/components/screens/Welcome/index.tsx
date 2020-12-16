import React, { MutableRefObject, useCallback } from 'react';
import { ReactComponent as TinyKittenIcon } from '../../../assets/tinykitten.svg';
import { ReactComponent as ArrowIcon } from '../../../assets/arrow.svg';
import styles from './styles.module.css';
import Postit from '../../Postit';

type Props = {
  aboutScreenRef: MutableRefObject<HTMLDivElement | null>;
};

const WelcomeScreen: React.FC<Props> = ({ aboutScreenRef }: Props) => {
  const handleArrowClick = useCallback(
    () =>
      aboutScreenRef.current?.scrollIntoView({
        behavior: 'smooth',
      }),
    [aboutScreenRef]
  );

  return (
    <section className={styles.container}>
      <div className={styles.logoWrapper}>
        <Postit className={styles.postit}>Frontend Engineer</Postit>
        <TinyKittenIcon width={120} height={120} className={styles.logo} />
      </div>
      <h1 className={styles.name}>TinyKitten</h1>
      <ArrowIcon onClick={handleArrowClick} className={styles.arrowLink} />
    </section>
  );
};

export default WelcomeScreen;
