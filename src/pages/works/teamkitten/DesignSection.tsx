import React, { useRef, useState } from 'react';
import TitlePostit from '../../../components/TitlePostit';
import styles from './styles.module.css';
import TeamKittenIMG from '../../../assets/works/teamkitten.png';
import ScreenVisibleProvider from '../../../components/screens/ScreenVisibleProvider';

const TeamKittenDesignSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <section className={styles.container} ref={ref}>
        {visible && (
          <TitlePostit
            className={styles.titlePostit}
            title="TeamKitten"
            subtitle="デザイン"
          />
        )}
        <article className={styles.content}>
          <img
            className={styles.galleryImg}
            src={TeamKittenIMG}
            alt="TrainLCD"
          />
          <h2 className={styles.galleryConcept}>
            掲載されることに喜びを覚える
            <br />
            シンプルながら美しいデザイン
          </h2>
        </article>
      </section>
    </ScreenVisibleProvider>
  );
};

export default TeamKittenDesignSection;
