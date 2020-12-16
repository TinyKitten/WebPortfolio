import React from 'react';
import Postit from '../../../components/Postit';
import NearStationIMG from '../../../assets/works/nearstation.png';
import styles from './styles.module.css';

const NearStationFirstSection: React.FC = () => (
  <section className={[styles.container, styles.fullHeight].join(' ')}>
    <article className={styles.content}>
      <Postit className={styles.postit}>Dev/WebApp</Postit>
      <img className={styles.logo} src={NearStationIMG} alt="TeamKitten" />
      <h2 className={styles.name}>NearStation</h2>
      <p className={styles.bio}>最寄り駅とその路線がひと目で分かるWebアプリ</p>
    </article>
  </section>
);

export default NearStationFirstSection;
