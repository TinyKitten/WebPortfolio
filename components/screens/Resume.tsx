'use client';
import resumeFixture from '../../fixtures/stories/resume.stories.json';
import { useScreenVisibility } from '../../hooks/useScreenVisibility';
import TitlePostit from '../TitlePostit';
import Tree from '../Tree';

const ResumeScreen = () => {
  const { visible, ref } = useScreenVisibility();

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {visible && <TitlePostit title="TinyKitten" subtitle="の職歴" />}
      <div className="relative flex flex-col items-center pt-[210px] pb-16">
        <Tree experienceType="resume" items={resumeFixture} visible={visible} />
      </div>
    </section>
  );
};

export default ResumeScreen;
