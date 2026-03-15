'use client';
import { useScreenVisibility } from '../../hooks/useScreenVisibility';
import SkillsCircle from '../SkillsCircle';
import TitlePostit from '../TitlePostit';
import JSIcon from '../marks/JSIcon';
import ReactIcon from '../marks/ReactIcon';
import TSIcon from '../marks/TSIcon';

const SkillsScreen = () => {
  const { visible, ref } = useScreenVisibility();

  return (
    <section ref={ref} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {visible && <TitlePostit title="TinyKitten" subtitle="のスキル" />}
      <div className="flex w-full flex-col items-center">
        {visible && (
          <div className="mt-[176px] mb-8 grid w-3/4 grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-8 animate-fade-slide bp800:mt-0 bp800:mb-0">
            <SkillsCircle icon={JSIcon} name="JavaScript" />
            <SkillsCircle icon={TSIcon} name="TypeScript" />
            <SkillsCircle icon={ReactIcon} name="React (Native)" />
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsScreen;
