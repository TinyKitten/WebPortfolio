import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import ScreenVisibleProvider from '../../../providers/ScreenVisibleProvider';
import Button from '../../Button';
import Postit from '../../Postit';
import styles from '../../../styles/components/screens/Works/NearStation.module.css';
import NearStationImage from '../../../assets/works/nearstation.png';

const WorksNearStation: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <div className={styles.content} ref={ref}>
        {visible && (
          <div className={styles.logoWrapper}>
            <Postit className={styles.postit}>NearStation</Postit>
            <div className={styles.image}>
              <Image src={NearStationImage} alt="NearStation" />
            </div>
          </div>
        )}
        {visible && (
          <p className={styles.description}>
            最寄り駅とその路線をすぐに知れるWebアプリ
          </p>
        )}
        <Link href="/works/nearstation" passHref>
          <div>
            {visible && (
              <Button className={styles.learnMoreBtn}>さらに詳しく</Button>
            )}
          </div>
        </Link>
      </div>
    </ScreenVisibleProvider>
  );
};

export default WorksNearStation;
