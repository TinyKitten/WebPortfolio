import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import TrainLCDImage from '../../assets/works/trainlcd.png';
import AppStoreIcon from '../../components/appstores/AppStoreIcon';
import GooglePlayIcon from '../../components/appstores/GooglePlayIcon';
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
  text-align: center;
  max-width: 90%;
  margin-top: 32px;
  line-height: 2;
  color: ${({ theme }) => theme.text};
`;
const ConceptDescriptionAnchor = styled.a`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  text-decoration: none;
`;

const SmallCaption = styled.small`
  text-align: center;
  max-width: 90%;
  margin-top: 32px;
  line-height: 2;
  color: ${({ theme }) => theme.text};
  font-size: 0.8rem;
  margin-top: 0;
`;

const TechContainer = styled.article`
  margin-top: 64px;
  width: 75%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 32px;
  animation: ${imageAnimation} 1s ease forwards;
`;

const AppStoreButton = styled.a<{ apple?: boolean }>`
  height: auto;
  overflow: hidden;
  margin-bottom: ${({ apple }) => (apple ? '32px' : '12px')};
`;

const StyledTitlePostit = styled(TitlePostit)`
  animation: ${titlePostitAnimation} 1s ease forwards;
`;
const FirstSection: React.FC = () => (
  <Container fullHeight>
    <ContentContainer>
      <StyledPostit>Dev/WebApp</StyledPostit>
      <LogoContainer>
        <Image src={TrainLCDImage} alt="TrainLCD" />
      </LogoContainer>
      <Name>TrainLCD</Name>
      <Bio>電車のLCDをスマホで</Bio>
    </ContentContainer>
  </Container>
);

const ConceptSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <Container ref={ref}>
        {visible && (
          <StyledTitlePostit title="TrainLCD" subtitle="コンセプト" />
        )}
        <ContentContainer>
          <Concept>StationAPIで電車のLCDを再現したい</Concept>
          <ConceptDescription>
            <ConceptDescriptionAnchor
              href="https://github.com/TinyKitten/StationAPI"
              target="_blank"
              rel="noopener noreferrer"
            >
              StationAPI
            </ConceptDescriptionAnchor>
            の応用例の一つです。 <br />
            前から電車のLCDを再現したいと思っていて、
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
    </ScreenVisibleProvider>
  );
};

const TechnologySection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <Container ref={ref}>
        {visible && <StyledTitlePostit title="TrainLCD" subtitle="使用技術" />}
        {visible && (
          <TechContainer>
            <SkillsCircle icon={TSIcon} name="TypeScript" />
            <SkillsCircle icon={ReactIcon} name="React Native" />
            <SkillsCircle icon={NestJSIcon} name="NestJS" />
            <SkillsCircle icon={MySQLIcon} name="MySQL" />
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
        {visible && <StyledTitlePostit title="TrainLCD" subtitle="リンク" />}
        <ContentContainer>
          <AppStoreButton href="https://play.google.com/store/apps/details?id=me.tinykitten.trainlcd&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
            <GooglePlayIcon width={180} />
          </AppStoreButton>
          <AppStoreButton
            apple
            href="https://apps.apple.com/jp/app/trainlcd/id1486355943"
          >
            <AppStoreIcon width={180} />
          </AppStoreButton>
          <Anchor
            href="https://trainlcd.tinykitten.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>公式サイト</Button>
          </Anchor>
          <Anchor
            href="https://github.com/TinyKitten/TrainLCD"
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

const WorksTrainLCDPage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, []);

  return (
    <div ref={ref}>
      <Head>
        <title>TrainLCD</title>
        <meta name="description" content="電車のLCDをスマホで" />
        <meta property="og:site_name" content="TinyKitten" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${process.env.PUBLIC_URL}/works/trainlcd`}
        />
        <meta property="og:title" content="TrainLCD" />
        <meta property="og:description" content="電車のLCDをスマホで" />
        <meta property="og:image" content="/works/trainlcd.png" />
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
    revalidate: 10,
  };
}

export default WorksTrainLCDPage;
