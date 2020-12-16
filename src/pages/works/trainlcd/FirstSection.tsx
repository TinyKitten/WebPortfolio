import React from 'react';
import Postit from '../../../components/Postit';
import TrainLCDIMG from '../../../assets/works/trainlcd.png';
import styles from './styles.module.css';

const TrainLCDFirstSection: React.FC = () => (
  <section className={[styles.container, styles.fullHeight].join(' ')}>
    <article className={styles.content}>
      <Postit className={styles.postit}>Dev/WebApp</Postit>
      <img className={styles.logo} src={TrainLCDIMG} alt="TrainLCD" />
      <h2 className={styles.name}>TrainLCD</h2>
      <p className={styles.bio}>電車のLCDをスマホで</p>
    </article>
  </section>
);

export default TrainLCDFirstSection;
