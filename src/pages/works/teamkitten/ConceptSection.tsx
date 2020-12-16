import React, { useRef, useState } from 'react';
import ScreenVisibleProvider from '../../../components/screens/ScreenVisibleProvider';
import TitlePostit from '../../../components/TitlePostit';
import styles from './styles.module.css';

const TeamKittenConceptSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <section className={styles.container} ref={ref}>
        {visible && (
          <TitlePostit
            className={styles.titlePostit}
            title="TeamKitten"
            subtitle="コンセプト"
          />
        )}
        <article className={styles.content}>
          <h2 className={styles.concept}>シンプルを追求した設計とUX</h2>
          <p className={styles.conceptDescription}>
            TeamKittenというネットサークルを僕が運営しています。
            <br />
            過去にはGoやNode.jsでAPIを自作して動的なコンテンツ配信を行っていましたが、
            <br />
            現在はNuxt.jsを用いて完全に静的に配信しています。(JAMStack)
            <br />
            ウェブサイトのデザインはシンプルを追求し、どこか暖かさを感じるデザインにしました。
          </p>
        </article>
      </section>
    </ScreenVisibleProvider>
  );
};

export default TeamKittenConceptSection;
