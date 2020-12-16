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
        {/* <app-postit className="postit" text="Frontend Engineer" /> */}
        {/* <img className="logo" src={} alt="TinyKitten" /> */}
        <TinyKittenIcon width={120} height={120} className={styles.logo} />
      </div>
      <h1 className={styles.name}>TinyKitten</h1>
      {/* <a v-smooth-scroll="{ duration: 1000 }" className="arrowLink" href="#aboutme">
    <img src="~/assets/arrow.svg" alt="下へ">
  </a> */}
      <ArrowIcon onClick={handleArrowClick} className={styles.arrowLink} />
    </section>
  );
};

export default WelcomeScreen;
