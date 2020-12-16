import React from 'react';
import Postit from '../../../components/Postit';
import TeamKittenIMG from '../../../assets/works/teamkitten.png';
import styles from './styles.module.css';

const TeamKittenFirstSection: React.FC = () => (
  <section className={[styles.container, styles.fullHeight].join(' ')}>
    <article className={styles.content}>
      <Postit className={styles.postit}>Dev/FullStack</Postit>
      <img className={styles.logo} src={TeamKittenIMG} alt="TeamKitten" />
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

export default TeamKittenFirstSection;
