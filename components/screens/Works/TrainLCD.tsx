import { useRef, useState } from 'react';
import Button from '../../Button';
import Postit from '../../Postit';
import styles from '../../../styles/components/screens/Works/TrainLCD.module.css';
import ScreenVisibleProvider from '../../../providers/ScreenVisibleProvider';
import Link from 'next/link';
import Image from 'next/image';
import TrainLCDImage from '../../../assets/works/trainlcd.png';

const WorksTrainLCD: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <div className={styles.content} ref={ref}>
        {visible && (
          <div className={styles.logoWrapper}>
            <Postit className={styles.postit}>TrainLCD</Postit>
            <div className={styles.image}>
              <Image src={TrainLCDImage} alt="TrainLCD" />
            </div>
          </div>
        )}

        {visible && (
          <p className={styles.description}>
            電車のLCDを再現したスマホアプリです。
            <br />
            現在App Store、Google Play Storeにて配信中。
          </p>
        )}
        <Link href="/works/trainlcd" passHref>
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

export default WorksTrainLCD;
