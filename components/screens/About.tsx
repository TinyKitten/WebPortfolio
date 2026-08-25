'use client';
import { getRandomGreeting } from '../../constants/greeting';
import { TRIVIA_ITEMS } from '../../constants/trivia';
import { useScreenVisibility } from '../../hooks/useScreenVisibility';
import Postit from '../Postit';
import TinyKittenIcon from '../TinyKittenIcon';
import TitlePostit from '../TitlePostit';
import { TriviaSlider } from '../TriviaSlider';

const AboutScreen = () => {
  const { visible, ref } = useScreenVisibility();

  return (
    <div id="about">
      <section ref={ref} className="relative min-h-screen overflow-hidden">
        {visible && <TitlePostit title="TinyKitten" subtitle="って誰？" />}
        <div className="flex flex-col items-center pt-[210px]">
          <div className="relative">
            {visible && (
              <Postit className="absolute -left-11 -top-6 z-[1] animate-heading-postit-left">
                {getRandomGreeting()}
              </Postit>
            )}
            <TinyKittenIcon
              width={120}
              height={120}
              className="drop-shadow-[0_3px_6px_rgba(0,0,0,0.16)]"
            />
          </div>
          <h2 className="mt-8 text-center text-[2rem] font-bold text-heading-text">TinyKitten</h2>
          <p className="mt-3 max-w-[calc(100%-64px)] text-left leading-[1.75] text-theme-text bp800:text-center">
            動物大好きな東京都練馬区在住のクリエイターです。
            <br />
            普段はTrainLCDというアプリを開発しています。
          </p>
          {visible && (
            <div className="mt-12 mb-16">
              <TriviaSlider title="TinyKitten" items={TRIVIA_ITEMS} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AboutScreen;
