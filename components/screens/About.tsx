'use client';
import { Element as ScrollElement } from 'react-scroll';
import { getRandomGreeting } from '../../constants/greeting';
import { useScreenVisibility } from '../../hooks/useScreenVisibility';
import TitlePostit from '../TitlePostit';
import {
  BioText,
  Container,
  ContentContainer,
  Logo,
  LogoWrapper,
  NameText,
  StyledPostit,
  StyledSwiperSlide,
  SwiperContainer,
} from './About.styled';
import { Swiper } from 'swiper/react';
import TriviaCard from '../TriviaCard';
import { TriviaItemObject } from '../../models/trivia';

const TRIVIA_ITEMS: TriviaItemObject[] = [
  {
    id: 1,
    title: 'TinyKittenの読み方📛',
    description:
      'タイニーキトゥンと読みます。\n意味は、小さな子猫です🐈\nでも、きったんと呼ばれることが多いです。',
    tags: ['基礎知識', 'スワイプできます'],
  },
  {
    id: 2,
    title: '青いシンボルの意味は？💙',
    description:
      '実は、ギリシャ文字のΑ(アルファ)を二つ重ねたシンボルなんです🫢\n二つの小さなモノ(アルファ)から大きなモノを作りたいという意志が込められています💪',
    tags: ['ポリシー', 'シンボル'],
  },
  {
    id: 3,
    title: '大事にしている言葉は？💬',
    description:
      'The Combination of **Alpha**\nA piece of something else.\nという言葉を標語として掲げていて、名刺の裏にも書いてあります😎',
    tags: ['モットー', '名刺'],
  },
  {
    id: 4,
    title: '動物が大好き🐱',
    description:
      '特にネコちゃんとブタさんが好きです🥰\n休日は大体都内のブタさんカフェに通うのが最近のトレンドです🐽',
    tags: ['私生活', '趣味'],
  },
  {
    id: 5,
    title: '開業したのはいつ？📅',
    description:
      '2021年12月1日に開業しました💼\nすでに5年以上のフロントエンドキャリアがあります。フロントならお任せください🔥',
    tags: ['キャリア', 'フリーランス'],
  },
];

const AboutScreen = () => {
  const { visible, ref } = useScreenVisibility();

  return (
    <ScrollElement name="about">
      <Container ref={ref}>
        {visible && <TitlePostit title="TinyKitten" subtitle="って誰？" />}
        <ContentContainer>
          <LogoWrapper>
            {visible && <StyledPostit>{getRandomGreeting()}</StyledPostit>}
            <Logo />
          </LogoWrapper>
          <NameText>TinyKitten</NameText>
          <BioText>
            東京都練馬区在住のフリーのフロントエンドエンジニア。
            <br />
            Reactの案件を基本的に引き受けています。
            <br />
            デザインとネイティブアプリ開発の知識があることが強みです。
          </BioText>
          {visible && (
            <SwiperContainer>
              <Swiper slidesPerView="auto" spaceBetween={0}>
                {TRIVIA_ITEMS.map((item) => (
                  <StyledSwiperSlide key={item.id}>
                    <TriviaCard item={item} visible />
                  </StyledSwiperSlide>
                ))}
              </Swiper>
            </SwiperContainer>
          )}
        </ContentContainer>
      </Container>
    </ScrollElement>
  );
};

export default AboutScreen;
