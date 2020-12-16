import React, { useRef, useState } from 'react';
import ScreenVisibleProvider from '../../../components/screens/ScreenVisibleProvider';
import TitlePostit from '../../../components/TitlePostit';
import styles from './styles.module.css';

const TrainLCDConceptSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <section className={styles.container} ref={ref}>
        {visible && (
          <TitlePostit
            className={styles.titlePostit}
            title="TrainLCD"
            subtitle="コンセプト"
          />
        )}
        <article className={styles.content}>
          <h2 className={styles.concept}>StationAPIで電車のLCDを再現したい</h2>
          <p className={styles.conceptDescription}>
            <a
              href="https://github.com/TinyKitten/StationAPI"
              target="_blank"
              rel="noopener noreferrer"
            >
              StationAPI
            </a>
            の応用例の一つです。 <br />
            前から電車のLCDを再現したいと思っていて、
            <a
              href="https://github.com/TinyKitten/StationAPI"
              target="_blank"
              rel="noopener noreferrer"
            >
              StationAPI
            </a>
            の大型アップデートで色々取れるようにした影響で作ろうと思いました。
            <br />
            満員電車、LCDのない路線など、現在どこにいるか、どの駅を通るのかひと目で分かります。
            <br />
            ぜひお試しください。
          </p>
          <small
            className={[styles.conceptDescription, styles.smallCaption].join(
              ' '
            )}
          >
            ※地下区間は非対応です
          </small>
        </article>
      </section>
    </ScreenVisibleProvider>
  );
};

export default TrainLCDConceptSection;
