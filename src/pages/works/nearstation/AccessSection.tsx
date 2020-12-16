import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import ScreenVisibleProvider from '../../../components/screens/ScreenVisibleProvider';
import TitlePostit from '../../../components/TitlePostit';
import styles from './styles.module.css';

const NearStationAccessSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <section className={styles.container} ref={ref}>
        {visible && (
          <TitlePostit
            className={styles.titlePostit}
            title="NearStation"
            subtitle="リンク"
          />
        )}
        <article className={styles.content}>
          <a
            href="https://near.tinykitten.me"
            target="_blank"
            className={styles.link}
            rel="noopener noreferrer"
          >
            <Button>使ってみる</Button>
          </a>
          <a
            href="https://github.com/TinyKitten/NearStation"
            target="_blank"
            className={styles.link}
            rel="noopener noreferrer"
          >
            <Button>リポジトリ</Button>
          </a>
          <Link to="/" className={styles.link}>
            <Button color="#555">戻る</Button>
          </Link>
        </article>
      </section>
    </ScreenVisibleProvider>
  );
};

export default NearStationAccessSection;
