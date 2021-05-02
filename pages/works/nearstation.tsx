import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/pages/works/nearstation.module.css';
import Head from 'next/head';
import Postit from '../../components/Postit';
import TitlePostit from '../../components/TitlePostit';
import ScreenVisibleProvider from '../../providers/ScreenVisibleProvider';
import SkillsCircle from '../../components/SkillsCircle';
import TSIcon from '../../components/marks/TSIcon';
import ReactIcon from '../../components/marks/ReactIcon';
import NestJSIcon from '../../components/marks/NestJSIcon';
import MySQLIcon from '../../components/marks/MySQLIcon';
import Button from '../../components/Button';
import Link from 'next/link';

const FirstSection: React.FC = () => (
  <section className={[styles.container, styles.fullHeight].join(' ')}>
    <article className={styles.content}>
      <Postit className={styles.postit}>Dev/WebApp</Postit>
      <img
        className={styles.logo}
        src="/works/nearstation.png"
        alt="NearStation"
      />
      <h2 className={styles.name}>NearStation</h2>
      <p className={styles.bio}>最寄り駅とその路線がひと目で分かるWebアプリ</p>
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

const TechnologySection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <section className={styles.container} ref={ref}>
        {visible && (
          <TitlePostit
            className={styles.titlePostit}
            title="NearStation"
            subtitle="使用技術"
          />
        )}
        {visible && (
          <article className={styles.techs}>
            <SkillsCircle icon={TSIcon} name="TypeScript" />
            <SkillsCircle icon={ReactIcon} name="React.js" />
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
          <div className={styles.link}>
            <Link href="/">
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

const WorksNearStationPage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, []);

  return (
    <div ref={ref}>
      <Head>
        <title>NearStation</title>
        <meta
          name="description"
          content="最寄り駅とその路線がひと目で分かるWebアプリ"
        />
        <meta property="og:site_name" content="TinyKitten" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${process.env.PUBLIC_URL}/works/nearstation`}
        />
        <meta property="og:title" content="NearStation" />
        <meta
          property="og:description"
          content="最寄り駅とその路線がひと目で分かるWebアプリ"
        />
        <meta property="og:image" content="/works/nearstation.png" />
      </Head>
      <FirstSection />
      <ConceptSection />
      <TechnologySection />
      <AccessSection />
    </div>
  );
};

export default WorksNearStationPage;
