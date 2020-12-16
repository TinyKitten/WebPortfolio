import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import ScreenVisibleProvider from '../../../components/screens/ScreenVisibleProvider';
import TitlePostit from '../../../components/TitlePostit';
import styles from './styles.module.css';
import { ReactComponent as AppStoreIcon } from '../../../assets/works/store-badges/apple-app-store.svg';
import { ReactComponent as GooglePlayStoreIcon } from '../../../assets/works/store-badges/google-play-store.svg';

const TrainLCDAccessSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <section className={styles.container} ref={ref}>
        {visible && (
          <TitlePostit
            className={styles.titlePostit}
            title="TrainLCD"
            subtitle="リンク"
          />
        )}
        <article className={styles.content}>
          <a
            className={styles.appStoreButton}
            href="https://play.google.com/store/apps/details?id=me.tinykitten.trainlcd&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
          >
            <GooglePlayStoreIcon width={180} />
          </a>
          <a
            className={[styles.appStoreButton, styles.appleAppStore].join(' ')}
            href="https://apps.apple.com/jp/app/trainlcd/id1486355943"
          >
            <AppStoreIcon width={180} />
          </a>
          <a
            href="https://github.com/TinyKitten/TrainLCD"
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

export default TrainLCDAccessSection;
