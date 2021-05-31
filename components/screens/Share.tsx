import { useRef, useState } from 'react';
import usePraise from '../../hooks/usePraise';
import ScreenVisibleProvider from '../../providers/ScreenVisibleProvider';
import styles from '../../styles/components/screens/Share.module.css';
import Button from '../Button';
import Postit from '../Postit';
import TitlePostit from '../TitlePostit';
import Praise from '../Praise';

type Props = {
  className: string;
};

const ShareScreen: React.FC<Props> = ({ className }: Props) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const { count, incrementCount } = usePraise(visible);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <section className={[styles.container, className].join(' ')} ref={ref}>
        {visible && (
          <TitlePostit
            className={styles.titlePostit}
            title="TinyKitten"
            subtitle="をシェア"
          />
        )}
        <div className={styles.content}>
          {visible && <Postit className={styles.postit}>シェアしよう！</Postit>}
          {visible && (
            <div className={styles.links}>
              <a
                href="https://twitter.com/intent/tweet?url=https://tinykitten.me&text=TinyKittenのポートフォリオ&via=tinykitten8&related=tinykitten8"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Button className={styles.shareButton} color="#1DA1F2">
                  Twitter
                </Button>
              </a>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://tinykitten.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className={styles.shareButton} color="#3E54A4">
                  Facebook
                </Button>
              </a>
              <Praise
                count={count}
                onIncrement={incrementCount}
                className={styles.shareButton}
              />
            </div>
          )}
        </div>
      </section>
    </ScreenVisibleProvider>
  );
};

export default ShareScreen;
