import React, { useRef, useState } from 'react';
import TitlePostit from '../../../components/TitlePostit';
import styles from './styles.module.css';
import TrainLCDIMG from '../../../assets/works/trainlcd.png';
import ScreenVisibleProvider from '../../../components/screens/ScreenVisibleProvider';

const TrainLCDDesignSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <section className={styles.container} ref={ref}>
        {visible && (
          <TitlePostit
            className={styles.titlePostit}
            title="TrainLCD"
            subtitle="デザイン"
          />
        )}
        <article className={styles.content}>
          <img className={styles.galleryImg} src={TrainLCDIMG} alt="TrainLCD" />
          <h2 className={styles.galleryConcept}>実物のLCDに近づくように</h2>
        </article>
      </section>
    </ScreenVisibleProvider>
  );
};

export default TrainLCDDesignSection;
