'use client';
import { getRandomGreeting } from '../../constants/greeting';
import { useScreenVisibility } from '../../hooks/useScreenVisibility';
import type { TriviaItemObject } from '../../models/trivia';
import Postit from '../Postit';
import TinyKittenIcon from '../TinyKittenIcon';
import TitlePostit from '../TitlePostit';
import { TriviaSlider } from '../TriviaSlider';

const TRIVIA_ITEMS: TriviaItemObject[] = [
  {
    id: 1,
    subject: 'TinyKittenの読み方📛',
    description:
      'タイニーキトゥンと読みます。\n意味は、小さな子猫です🐈\nでも、きったんと呼ばれることが多いです。',
    tags: ['基礎知識', 'スワイプできます'],
  },
  {
    id: 2,
    subject: '青いシンボルの意味は？💙',
    description:
      '実は、ギリシャ文字のΑ(アルファ)を二つ重ねたシンボルなんです🫢\n二つの小さなモノ(アルファ)から大きなモノを作りたいという意志が込められています💪',
    tags: ['ポリシー', 'シンボル'],
  },
  {
    id: 3,
    subject: '大事にしている言葉は？💬',
    description:
      'The Combination of **Alpha**\nA piece of something else.\nという言葉を標語として掲げていて、名刺の裏にも書いてあります😎',
    tags: ['モットー', '名刺'],
  },
  {
    id: 4,
    subject: '動物が大好き🐱',
    description:
      '特にネコちゃんとブタさんが好きです🥰\n休日は大体都内のブタさんカフェに通うのが最近のトレンドです🐽',
    tags: ['私生活', '趣味'],
  },
  {
    id: 5,
    subject: '開業したのはいつ？📅',
    description: '2018年12月1日に屋号「TinyKitten」として開業しました💼',
    tags: ['キャリア', 'フリーランス'],
  },
];

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
          <h2 className="mt-8 text-center text-[2rem] font-bold text-heading-text">
            TinyKitten
          </h2>
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
