import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import GooglePlayIcon from '../../components/appstores/GooglePlayIcon';
import AppStoreIcon from '../../components/appstores/AppStoreIcon';
import MySQLIcon from '../../components/marks/MySQLIcon';
import NestJSIcon from '../../components/marks/NestJSIcon';
import ReactIcon from '../../components/marks/ReactIcon';
import TSIcon from '../../components/marks/TSIcon';
import Postit from '../../components/Postit';
import SkillsCircle from '../../components/SkillsCircle';
import TitlePostit from '../../components/TitlePostit';
import ScreenVisibleProvider from '../../providers/ScreenVisibleProvider';
import styles from '../../styles/pages/works/trainlcd.module.css';
import Button from '../../components/Button';
import Link from 'next/link';
import Image from 'next/image';
import TrainLCDImage from '../../assets/works/trainlcd.png';

const FirstSection: React.FC = () => (
  <section className={[styles.container, styles.fullHeight].join(' ')}>
    <article className={styles.content}>
      <Postit className={styles.postit}>Dev/WebApp</Postit>
      <div className={styles.logo}>
        <Image src={TrainLCDImage} alt="TrainLCD" />
      </div>
      <h2 className={styles.name}>TrainLCD</h2>
      <p className={styles.bio}>電車のLCDをスマホで</p>
    </article>
  </section>
);

const ConceptSection: React.FC = () => {
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

const TechnologySection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <section className={styles.container} ref={ref}>
        {visible && (
          <TitlePostit
            className={styles.titlePostit}
            title="TrainLCD"
            subtitle="使用技術"
          />
        )}
        {visible && (
          <article className={styles.techs}>
            <SkillsCircle icon={TSIcon} name="TypeScript" />
            <SkillsCircle icon={ReactIcon} name="React Native" />
            <SkillsCircle icon={NestJSIcon} name="NestJS" />
            <SkillsCircle icon={MySQLIcon} name="MySQL" />
          </article>
        )}
      </section>
    </ScreenVisibleProvider>
  );
};

const AccessSection: React.FC = () => {
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
            <GooglePlayIcon width={180} />
          </a>
          <a
            className={[styles.appStoreButton, styles.appleAppStore].join(' ')}
            href="https://apps.apple.com/jp/app/trainlcd/id1486355943"
          >
            <AppStoreIcon width={180} />
          </a>
          <a
            href="https://trainlcd.tinykitten.me"
            target="_blank"
            className={styles.link}
            rel="noopener noreferrer"
          >
            <Button>公式サイト</Button>
          </a>
          <a
            href="https://github.com/TinyKitten/TrainLCD"
            target="_blank"
            className={styles.link}
            rel="noopener noreferrer"
          >
            <Button>リポジトリ</Button>
          </a>
          <div className={styles.link}>
            <Link href="/" passHref>
              <div>
                <Button color="#555">戻る</Button>
              </div>
            </Link>
          </div>
        </article>
      </section>
    </ScreenVisibleProvider>
  );
};

const WorksTrainLCDPage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, []);

  return (
    <div ref={ref}>
      <Head>
        <title>TrainLCD</title>
        <meta name="description" content="電車のLCDをスマホで" />
        <meta property="og:site_name" content="TinyKitten" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${process.env.PUBLIC_URL}/works/trainlcd`}
        />
        <meta property="og:title" content="TrainLCD" />
        <meta property="og:description" content="電車のLCDをスマホで" />
        <meta property="og:image" content="/works/trainlcd.png" />
      </Head>
      <FirstSection />
      <ConceptSection />
      <TechnologySection />
      <AccessSection />
    </div>
  );
};

export default WorksTrainLCDPage;
