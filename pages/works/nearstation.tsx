import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import NearStationPic from '../../assets/works/nearstation.png';
import Button from '../../components/Button';
import MySQLIcon from '../../components/marks/MySQLIcon';
import NestJSIcon from '../../components/marks/NestJSIcon';
import ReactIcon from '../../components/marks/ReactIcon';
import TSIcon from '../../components/marks/TSIcon';
import Postit from '../../components/Postit';
import SkillsCircle from '../../components/SkillsCircle';
import TitlePostit from '../../components/TitlePostit';
import {
  imageAnimation,
  singleHeadingPostitAnimation,
} from '../../constants/keyframets';
import useScreenVisibility from '../../hooks/useScreenVisibility';

const Container = styled.section<{ fullHeight?: boolean }>`
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

const FirstSection: React.FC = () => (
  <Container fullHeight>
    <ContentContainer>
      <StyledPostit>Dev/WebApp</StyledPostit>
      <LogoContainer>
        <Image src={NearStationPic} alt="NearStation" />
      </LogoContainer>
      <Name>NearStation</Name>
      <Bio>最寄り駅とその路線がひと目で分かるWebアプリ</Bio>
    </ContentContainer>
  </Container>
);

const ConceptSection: React.FC = () => {
  const ref = useRef(null);
  const visible = useScreenVisibility(ref);

  return (
    <Container ref={ref}>
      {visible && <TitlePostit title={'Near\nStation'} subtitle="コンセプト" />}
      <ContentContainer>
        <Concept>今いる場所の最寄り駅と路線を知りたい</Concept>
        <ConceptDescription>
          StationAPIの応用例の一つです。
          <br />
          シンプルに今いる場所の最寄り駅の名前と
          <br />
          駅の路線の停車駅を知りたいときに役に立つと思い、開発しました。
          <br />
          今いる駅の路線がどこに行くのか知りたいときなどにお役に立つかと思います。
        </ConceptDescription>
      </ContentContainer>
    </Container>
  );
};

const TechnologySection: React.FC = () => {
  const ref = useRef(null);
  const visible = useScreenVisibility(ref);

  return (
    <Container ref={ref}>
      {visible && <TitlePostit title={'Near\nStation'} subtitle="使用技術" />}
      {visible && (
        <TechContainer>
          <SkillsCircle icon={TSIcon} name="TypeScript" />
          <SkillsCircle icon={ReactIcon} name="React.js" />
          <SkillsCircle icon={NestJSIcon} name="NestJS" />
          <SkillsCircle icon={MySQLIcon} name="MySQL" />
        </TechContainer>
      )}
    </Container>
  );
};

const AccessSection: React.FC = () => {
  const ref = useRef(null);
  const visible = useScreenVisibility(ref);

  return (
    <Container ref={ref}>
      {visible && <TitlePostit title={'Near\nStation'} subtitle="リンク" />}
      <ContentContainer>
        <Anchor
          href="https://near.tinykitten.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>使ってみる</Button>
        </Anchor>
        <Anchor
          href="https://github.com/TinyKitten/NearStation"
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
  );
};

const WorksNearStationPage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, []);

  return (
    <div ref={ref}>
      <Head>
        <title>NearStation</title>
        <meta
          name="description"
          content="最寄り駅とその路線がひと目で分かるWebアプリ"
        />
        <meta property="og:site_name" content="TinyKitten" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${process.env.PUBLIC_URL}/works/nearstation`}
        />
        <meta property="og:title" content="NearStation" />
        <meta
          property="og:description"
          content="最寄り駅とその路線がひと目で分かるWebアプリ"
        />
        <meta property="og:image" content="/works/nearstation.png" />
      </Head>
      <FirstSection />
      <ConceptSection />
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

export default WorksNearStationPage;
