import React, { useRef, useState } from 'react';
import TitlePostit from '../../TitlePostit';
import ScreenVisibleProvider from '../ScreenVisibleProvider';
import WorksNearStation from './NearStation';
import styles from './styles.module.css';
import WorksTeamKitten from './TeamKitten';
import WorksTrainLCD from './TrainLCD';

const WorksScreen: React.FC = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <section className={styles.container} ref={ref}>
        {visible && (
          <TitlePostit
            className={styles.titilePostit}
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
