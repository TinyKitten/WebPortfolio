import { useRef, useState } from 'react';
import ScreenVisibleProvider from '../../../providers/ScreenVisibleProvider';
import TitlePostit from '../../TitlePostit';
import styles from '../../../styles/components/screens/Works/index.module.css';
import WorksTrainLCD from './TrainLCD';
import WorksNearStation from './NearStation';

type Props = {
  className: string;
};

const WorksScreen: React.FC<Props> = ({ className }: Props) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <section className={[styles.container, className].join(' ')} ref={ref}>
        {visible && (
          <TitlePostit
            className={styles.titlePostit}
            title="TinyKitten"
            subtitle="が作ったよ"
          />
        )}
        <WorksTrainLCD />
        <WorksNearStation />
      </section>
    </ScreenVisibleProvider>
  );
};

export default WorksScreen;
