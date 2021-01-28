import { MutableRefObject, useCallback } from 'react';
import styles from '../../styles/components/screens/Welcome.module.css';
import TinyKittenIcon from '../TinyKittenIcon';
import ArrowIcon from '../ArrowIcon';
import Postit from '../Postit';

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
