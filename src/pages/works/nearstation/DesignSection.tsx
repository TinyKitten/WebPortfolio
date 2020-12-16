import React, { useRef, useState } from 'react';
import TitlePostit from '../../../components/TitlePostit';
import styles from './styles.module.css';
import NearStationIMG from '../../../assets/works/nearstation.png';
import ScreenVisibleProvider from '../../../components/screens/ScreenVisibleProvider';

const NearStationDesignSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <section className={styles.container} ref={ref}>
        {visible && (
          <TitlePostit
            className={styles.titlePostit}
            title="NearStation"
            subtitle="デザイン"
          />
        )}
        <article className={styles.content}>
          <img
            className={styles.galleryImg}
            src={NearStationIMG}
            alt="NearStation"
          />
          <h2 className={styles.galleryConcept}>
            すっきりと透き通るような繊細なデザイン
          </h2>
        </article>
      </section>
    </ScreenVisibleProvider>
  );
};

export default NearStationDesignSection;
