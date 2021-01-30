import { useRef, useState } from 'react';
import ScreenVisibleProvider from '../../../providers/ScreenVisibleProvider';
import TitlePostit from '../../TitlePostit';
import styles from '../../../styles/components/screens/Works/index.module.css';
import WorksTrainLCD from './TrainLCD';
import WorksTeamKitten from './TeamKitten';
import WorksNearStation from './NearStation';

const WorksScreen: React.FC = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <section className={styles.container} ref={ref}>
        {visible && (
          <TitlePostit
            className={styles.titlePostit}
            title="TinyKitten"
            subtitle="が作ったよ"
          />
        )}
        <WorksTrainLCD />
        <WorksTeamKitten />
        <WorksNearStation />
      </section>
    </ScreenVisibleProvider>
  );
};

export default WorksScreen;
