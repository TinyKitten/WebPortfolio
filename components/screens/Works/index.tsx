'use client';
import { useScreenVisibility } from '../../../hooks/useScreenVisibility';
import TitlePostit from '../../TitlePostit';
import WorksTrainLCD from './TrainLCD';

const WorksScreen = () => {
  const { visible, ref } = useScreenVisibility();

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {visible && <TitlePostit title="TinyKitten" subtitle="が作ったよ" />}
      <div className="mt-36 bp800:mt-0">
        <WorksTrainLCD />
      </div>
    </section>
  );
};

export default WorksScreen;
