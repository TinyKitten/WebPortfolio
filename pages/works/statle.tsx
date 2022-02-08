import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import STATLEImage from '../../assets/works/statle.png';
import Button from '../../components/Button';
import NextJSIcon from '../../components/marks/NextJSIcon';
import ReactIcon from '../../components/marks/ReactIcon';
import TSIcon from '../../components/marks/TSIcon';
import Postit from '../../components/Postit';
import SkillsCircle from '../../components/SkillsCircle';
import TitlePostit from '../../components/TitlePostit';
import {
  imageAnimation,
  singleHeadingPostitAnimation,
  titlePostitAnimation,
} from '../../constants/keyframets';
import ScreenVisibleProvider from '../../providers/ScreenVisibleProvider';

const Container = styled.section<{ fullHeight?: boolean }>`
  position: relative;
  min-height: calc(100vh - 48px);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  &:nth-child(even) {
    background: ${({ theme }) => theme.subBg};
  }
  &:first-child {
    min-height: 100vh;
  }

  min-height: ${({ fullHeight }) => (fullHeight ? '100vh' : undefined)};
`;

const ContentContainer = styled.article`
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 144px;
  padding-bottom: 32px;
  &:first-child {
    margin-top: 48px;
  }

  @media (min-width: 800px) {
    padding-bottom: 64px;
  }
`;

const Anchor = styled.a`
  margin-bottom: 32px;
`;

const StyledPostit = styled(Postit)`
  display: block;
  margin-bottom: 32px;
  animation: ${singleHeadingPostitAnimation} 1s ease forwards;
`;

const Name = styled.h2`
  margin-top: 32px;
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const LogoContainer = styled.div`
  opacity: 0;
  width: 210px;
  height: auto;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.16));
  animation: ${imageAnimation} 1s ease 0.25s forwards;
`;

const Bio = styled.p`
  text-align: center;
  max-width: calc(100% - 64px);
  line-height: 1.75;
  margin-top: 12px;
  color: ${({ theme }) => theme.text};
`;

const Concept = styled.h2`
  text-align: center;
  line-height: 1.5;
  font-size: 2rem;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  max-width: 90%;
`;
const ConceptDescription = styled.p`
  text-align: left;
  max-width: 90%;
  margin-top: 32px;
  line-height: 2;
  color: ${({ theme }) => theme.text};
  @media (min-width: 800px) {
    text-align: center;
  }
`;

const TechContainer = styled.article`
  margin-top: 64px;
  width: 75%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 32px;
  animation: ${imageAnimation} 1s ease forwards;
`;

const StyledTitlePostit = styled(TitlePostit)`
  animation: ${titlePostitAnimation} 1s ease forwards;
`;
const FirstSection: React.FC = () => (
  <Container fullHeight>
    <ContentContainer>
      <StyledPostit>Dev/WebApp</StyledPostit>
      <LogoContainer>
        <Image src={STATLEImage} alt="STATLE" />
      </LogoContainer>
      <Name>STATLE</Name>
      <Bio>日本の駅版Wordleクローン。今日の駅を当ててシェアしよう。</Bio>
    </ContentContainer>
  </Container>
);

const ConceptSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <Container ref={ref}>
        {visible && <TitlePostit title="STATLE" subtitle="コンセプト" />}
        <ContentContainer>
          <Concept>駅名Wordleがあったら面白いのでは</Concept>
          <ConceptDescription>
            駅データでなにかゲームが作れたら面白いのでは？
            <br />
            そう思ってた頃に元ネタ「Wordle」が流行りだしました。
            <br />
            思い立ったら吉日、すぐに作り始め、３〜４時間程度である程度動くものが完成し、公開しました。
            <br />
            実際、評判は上々でここ最近多くの人に遊んでいただいています。
          </ConceptDescription>
        </ContentContainer>
      </Container>
    </ScreenVisibleProvider>
  );
};

const TechnologySection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <Container ref={ref}>
        {visible && <StyledTitlePostit title="STATLE" subtitle="使用技術" />}
        {visible && (
          <TechContainer>
            <SkillsCircle icon={TSIcon} name="TypeScript" />
            <SkillsCircle icon={ReactIcon} name="React.js" />
            <SkillsCircle icon={NextJSIcon} name="Next.js" />
          </TechContainer>
        )}
      </Container>
    </ScreenVisibleProvider>
  );
};

const AccessSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <Container ref={ref}>
        {visible && <StyledTitlePostit title="STATLE" subtitle="リンク" />}
        <ContentContainer>
          <Anchor
            href="https://statle.tinykitten.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>遊んでみる</Button>
          </Anchor>
          <Anchor
            href="https://github.com/TinyKitten/STATLE"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>リポジトリ</Button>
          </Anchor>
          <Anchor>
            <Link href="/" passHref>
              <div>
                <Button color="#555">戻る</Button>
              </div>
            </Link>
          </Anchor>
        </ContentContainer>
      </Container>
    </ScreenVisibleProvider>
  );
};

const WorksSTATLEPage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, []);

  return (
    <div ref={ref}>
      <Head>
        <title>STATLE</title>
        <meta
          name="description"
          content="日本の駅版Wordleクローン。今日の駅を当ててシェアしよう。"
        />
        <meta property="og:site_name" content="TinyKitten" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${process.env.PUBLIC_URL}/works/statle`}
        />
        <meta property="og:title" content="STATLE" />
        <meta
          property="og:description"
          content="日本の駅版Wordleクローン。今日の駅を当ててシェアしよう。"
        />
        <meta property="og:image" content="/works/statle.png" />
      </Head>
      <FirstSection />
      <ConceptSection />
      <TechnologySection />
      <AccessSection />
    </div>
  );
};

export async function getStaticProps(): Promise<{
  props: unknown;
  revalidate: number;
}> {
  return {
    props: {},
    revalidate: 60,
  };
}

export default WorksSTATLEPage;
