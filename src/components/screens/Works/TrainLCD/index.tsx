import React, { useRef, useState } from 'react';
import Button from '../../../Button';
import Postit from '../../../Postit';
import ScreenVisibleProvider from '../../ScreenVisibleProvider';
import styles from './styles.module.css';
import TrainLCDIMG from '../../../../assets/works/trainlcd.png';

const WorksTrainLCD: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <div className={styles.content} ref={ref}>
        {visible && (
          <div className={styles.logoWrapper}>
            <Postit className={styles.postit}>TrainLCD</Postit>
            <img className={styles.image} src={TrainLCDIMG} alt="TrainLCD" />
          </div>
        )}

        {visible && (
          <p className={styles.description}>
            電車のLCDを再現したスマホアプリです。
            <br />
            現在App Store、Google Play Storeにて配信中。
          </p>
        )}
        <a href="/works/trainlcd">
          {visible && (
            <Button className={styles.learnMoreBtn} text="さらに詳しく" />
          )}
        </a>
      </div>
    </ScreenVisibleProvider>
  );
};

export default WorksTrainLCD;
