import React, { useRef, useState } from 'react';
import ScreenVisibleProvider from '../../../components/screens/ScreenVisibleProvider';
import TitlePostit from '../../../components/TitlePostit';
import styles from './styles.module.css';

const NearStationConceptSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <section className={styles.container} ref={ref}>
        {visible && (
          <TitlePostit
            className={styles.titlePostit}
            title="NearStation"
            subtitle="コンセプト"
          />
        )}
        <article className={styles.content}>
          <h2 className={styles.concept}>
            今いる場所の最寄り駅と路線を知りたい
          </h2>
          <p className={styles.conceptDescription}>
            StationAPIの応用例の一つです。
            <br />
            シンプルに今いる場所の最寄り駅の名前と
            <br />
            駅の路線の停車駅を知りたいときに役に立つと思い、開発しました。
            <br />
            今いる駅の路線がどこに行くのか知りたいときなどにお役に立つかと思います。
          </p>
        </article>
      </section>
    </ScreenVisibleProvider>
  );
};

export default NearStationConceptSection;
