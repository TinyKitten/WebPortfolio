import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';
import JSIcon from '../../components/marks/JSIcon';
import NuxtJSIcon from '../../components/marks/NuxtJSIcon';
import Postit from '../../components/Postit';
import SkillsCircle from '../../components/SkillsCircle';
import TitlePostit from '../../components/TitlePostit';
import ScreenVisibleProvider from '../../providers/ScreenVisibleProvider';
import styles from '../../styles/pages/works/teamkitten.module.css';

const FirstSection: React.FC = () => (
  <section className={[styles.container, styles.fullHeight].join(' ')}>
    <article className={styles.content}>
      <Postit className={styles.postit}>Dev/WebApp</Postit>
      <img
        className={styles.logo}
        src="/works/teamkitten.png"
        alt="TeamKitten"
      />
      <h2 className={styles.name}>TeamKitten</h2>
      <p className={styles.bio}>
        TeamKittenというネットサークルの メンバー管理API設計・実装、
        <br />
        ウェブサイトの開発を担当しました。 現在はNuxt.jsを用いており、
        <br />
        コンテンツを完全に静的に配信することにより高速な表示とより良いUXを実現しました。
      </p>
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

const TechnologySection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <section className={styles.container} ref={ref}>
        {visible && (
          <TitlePostit
            className={styles.titlePostit}
            title="TeamKitten"
            subtitle="使用技術"
          />
        )}
        {visible && (
          <article className={styles.techs}>
            <SkillsCircle icon={JSIcon} name="JavaScript" />
            <SkillsCircle icon={NuxtJSIcon} name="NuxtJS" />
          </article>
        )}
      </section>
    </ScreenVisibleProvider>
  );
};

const DesignSection: React.FC = () => {
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
            src="/works/teamkitten.png"
            alt="NearStation"
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

const AccessSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <section className={styles.container} ref={ref}>
        {visible && (
          <TitlePostit
            className={styles.titlePostit}
            title="TeamKitten"
            subtitle="リンク"
          />
        )}
        <article className={styles.content}>
          <a
            href="https://teamkitten.tk"
            target="_blank"
            className={styles.link}
            rel="noopener noreferrer"
          >
            <Button>公式サイト</Button>
          </a>
          <a
            href="https://github.com/TeamKitten/OfficialWeb"
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

const WorksTeamKittenPage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, []);

  return (
    <div ref={ref}>
      <Head>
        <title>TeamKitten</title>
        <meta
          name="description"
          content="
      'TeamKittenというネットサークルのメンバー管理API設計・実装、ウェブサイトの開発を担当しました。"
        />
        <meta property="og:site_name" content="TinyKitten" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${process.env.PUBLIC_URL}/works/teamkitten`}
        />
        <meta property="og:title" content="TeamKitten" />
        <meta
          property="og:description"
          content="
      'TeamKittenというネットサークルのメンバー管理API設計・実装、ウェブサイトの開発を担当しました。"
        />
        <meta property="og:image" content="/works/teamkitten.png" />
      </Head>

      <FirstSection />
      <ConceptSection />
      <DesignSection />
      <TechnologySection />
      <AccessSection />
    </div>
  );
};

export default WorksTeamKittenPage;
