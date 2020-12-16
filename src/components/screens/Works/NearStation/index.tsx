import React, { useRef, useState } from 'react';
import Button from '../../../Button';
import Postit from '../../../Postit';
import ScreenVisibleProvider from '../../ScreenVisibleProvider';
import styles from './styles.module.css';
import NearStationIMG from '../../../../assets/works/nearstation.png';

const WorksNearStation: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <div className={styles.content} ref={ref}>
        {visible && (
          <div className={styles.logoWrapper}>
            <Postit className={styles.postit}>NearStation</Postit>
            <img
              className={styles.image}
              src={NearStationIMG}
              alt="NearStation"
            />
          </div>
        )}
        {visible && (
          <p className={styles.description}>
            最寄り駅とその路線をすぐに知れるWebアプリ
          </p>
        )}
        <a href="/works/nearstation">
          {visible && (
            <Button className={styles.learnMoreBtn} text="さらに詳しく" />
          )}
        </a>
      </div>
    </ScreenVisibleProvider>
  );
};

export default WorksNearStation;
