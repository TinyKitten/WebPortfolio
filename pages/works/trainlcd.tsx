import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import TrainLCDImage from '../../assets/works/trainlcd.png';
import Button from '../../components/Button';
import Postit from '../../components/Postit';
import SkillsCircle from '../../components/SkillsCircle';
import StyledImage from '../../components/StyledImage';
import TitlePostit from '../../components/TitlePostit';
import Tree from '../../components/Tree';
import MySQLIcon from '../../components/marks/MySQLIcon';
import NestJSIcon from '../../components/marks/NestJSIcon';
import ReactIcon from '../../components/marks/ReactIcon';
import TSIcon from '../../components/marks/TSIcon';
import {
  imageAnimation,
  singleHeadingPostitAnimation,
} from '../../constants/keyframets';
import storiesArray from '../../fixtures/stories/works/trainlcd.stories.json';
import useScreenVisibility from '../../hooks/useScreenVisibility';

const Container = styled.section<{ fullHeight?: boolean; padTop?: boolean }>`
  position: relative;
  min-height: 100vh;
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
    margin-top: -48px;
  }
  min-height: ${({ fullHeight }) => (fullHeight ? '100vh' : undefined)};
  padding-top: ${({ padTop }) => (padTop ? '144px' : '0px')};
`;

const ContentContainer = styled.article`
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 48px;
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
  position: relative;
  opacity: 0;
  width: 320px;
  height: auto;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.16));
  animation: ${imageAnimation} 1s ease 0.25s forwards;
  @media (min-width: 800px) {
    width: 480px;
  }
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
const ConceptDescriptionAnchor = styled.a`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  text-decoration: none;
`;

const SmallCaption = styled.small`
  text-align: left;
  max-width: 90%;
  margin-top: 32px;
  line-height: 2;
  color: ${({ theme }) => theme.text};
  font-size: 0.8rem;
  margin-top: 0;
  width: 100%;
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

const TreeContainer = styled.article`
  margin: 64px 0;
`;

const FirstSection: React.FC = () => (
  <Container fullHeight>
    <ContentContainer>
      <StyledPostit>Dev/MobileApp</StyledPostit>
      <LogoContainer>
        <StyledImage fill sizes="320px" src={TrainLCDImage} alt="TrainLCD" />
      </LogoContainer>
      <Name>TrainLCD</Name>
      <Bio>日本全国の鉄道路線で使える新感覚のナビゲーションアプリ</Bio>
    </ContentContainer>
  </Container>
);

const ConceptSection: React.FC = () => {
  const ref = useRef(null);
  const visible = useScreenVisibility(ref);

  return (
    <Container ref={ref}>
      {visible && <TitlePostit title="TrainLCD" subtitle="コンセプト" />}
      <ContentContainer>
        <Concept>Webの技術で電車のLCDを再現したい</Concept>
        <ConceptDescription>
          このアプリの開発を始める前に趣味で作っていた
          <ConceptDescriptionAnchor
            href="https://github.com/TinyKitten/StationAPI"
            target="_blank"
            rel="noopener noreferrer"
          >
            StationAPI
          </ConceptDescriptionAnchor>
          の応用例の一つです。 <br />
          以前より電車のLCDを再現したいと思っていて、
          <ConceptDescriptionAnchor
            href="https://github.com/TinyKitten/StationAPI"
            target="_blank"
            rel="noopener noreferrer"
          >
            StationAPI
          </ConceptDescriptionAnchor>
          の大型アップデートで色々取れるようにした影響で作ろうと思いました。
          <br />
          満員電車、LCDのない路線など、現在どこにいるか、どの駅を通るのかひと目で分かります。
          <br />
          ぜひお試しください。
        </ConceptDescription>
        <SmallCaption>※地下区間は非対応です</SmallCaption>
      </ContentContainer>
    </Container>
  );
};

const TechnologySection: React.FC = () => {
  const ref = useRef(null);
  const visible = useScreenVisibility(ref);

  return (
    <Container padTop ref={ref}>
      {visible && <TitlePostit title="TrainLCD" subtitle="使用技術" />}
      {visible && (
        <TechContainer>
          <SkillsCircle icon={TSIcon} name="TypeScript" />
          <SkillsCircle icon={ReactIcon} name="React Native" />
          <SkillsCircle icon={NestJSIcon} name="NestJS" />
          <SkillsCircle icon={MySQLIcon} name="MySQL" />
        </TechContainer>
      )}
    </Container>
  );
};

const StoriesSection: React.FC = () => {
  const ref = useRef(null);
  const visible = useScreenVisibility(ref);

  return (
    <Container padTop ref={ref}>
      {visible && <TitlePostit title="TrainLCD" subtitle="ストーリー" />}
      {visible && (
        <TreeContainer>
          <Tree experienceType="worksStory" items={storiesArray} visible />
        </TreeContainer>
      )}
    </Container>
  );
};

const AccessSection: React.FC = () => {
  const ref = useRef(null);
  const visible = useScreenVisibility(ref);

  return (
    <Container ref={ref}>
      {visible && <TitlePostit title="TrainLCD" subtitle="リンク" />}
      <ContentContainer>
        <Anchor
          href="https://trainlcd.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>公式サイト</Button>
        </Anchor>
        <Anchor
          href="https://github.com/TrainLCD/MobileApp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>リポジトリ</Button>
        </Anchor>

        <Link href="/" passHref>
          <div>
            <Button color="#555">戻る</Button>
          </div>
        </Link>
      </ContentContainer>
    </Container>
  );
};

const WorksTrainLCDPage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, []);

  return (
    <div ref={ref}>
      <Head>
        <title>TrainLCD</title>
        <meta
          name="description"
          content="日本全国の鉄道路線で使える新感覚のナビゲーションアプリ"
        />
        <meta property="og:site_name" content="TinyKitten" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${process.env.PUBLIC_URL}/works/trainlcd`}
        />
        <meta property="og:title" content="TrainLCD" />
        <meta
          property="og:description"
          content="日本全国の鉄道路線で使える新感覚のナビゲーションアプリ"
        />
        <meta property="og:image" content="/works/trainlcd.png" />
      </Head>
      <FirstSection />
      <ConceptSection />
      <StoriesSection />
      <TechnologySection />
      <AccessSection />
    </div>
  );
};

export function getStaticProps(): {
  props: unknown;
  revalidate: number;
} {
  return {
    props: {},
    revalidate: 60,
  };
}

export default WorksTrainLCDPage;
