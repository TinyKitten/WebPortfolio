import Link from 'next/link';
import styled from 'styled-components';
import TrainLCDImage from '../../../assets/works/trainlcd.png';
import {
  headingPostitAnimation,
  imageAnimation,
} from '../../../constants/keyframets';
import { useScreenVisibility } from '../../../hooks/useScreenVisibility';
import { LearnMoreButton } from '../../LearnMoreButton';
import Postit from '../../Postit';
import StyledImage from '../../StyledImage';
import { TriviaSlider } from '../../TriviaSlider';

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: 128px 0;

  @media (max-width: 800px) {
    padding: 64px 0;
  }
`;

const LogoContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPostit = styled(Postit)`
  position: absolute;
  transform: rotate(5deg);
  left: auto;
  right: auto;
  bottom: -24px;
  z-index: 1;
  animation: ${headingPostitAnimation} 1s ease 0.25s forwards;
  opacity: 0;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 480px;
  max-width: 75%;
  height: auto;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.16));
  animation: ${imageAnimation} 1s ease forwards;
`;

const Heading = styled.p`
  text-align: center;
  line-height: 1.75;
  margin-top: 48px;
  color: ${({ theme }) => theme.headingText};
  animation: ${imageAnimation} 1s ease forwards;
`;

const InnerContainer = styled.div`
  width: 100%;
`;

const TriviaContainer = styled.div`
  margin-top: 32px;
`;

const WorksTrainLCD: React.FC = () => {
  const { visible, ref } = useScreenVisibility();

  return (
    <ContentContainer ref={ref}>
      {visible && (
        <LogoContainer>
          <StyledPostit>TrainLCD</StyledPostit>
          <ImageContainer>
            <StyledImage
              sizes="480px"
              fill
              src={TrainLCDImage}
              alt="TrainLCD"
            />
          </ImageContainer>
        </LogoContainer>
      )}

      {visible && (
        <InnerContainer>
          <Heading>
            日本全国の鉄道路線で使える
            <br />
            新感覚ナビゲーションアプリ。
            <br />
            2019年から個人開発を続け、現在も進化中。
          </Heading>

          <TriviaContainer>
            <TriviaSlider
              title="TrainLCD"
              items={[
                {
                  id: 1,
                  subject: '累計6万DL超🔥',
                  description:
                    'iOSを中心に利用されています。\n初回リリースから全国の鉄道路線を網羅し6年以上愛され続け、\n累計500件以上のレビューで平均評価⭐️4以上！\n日々の通勤・旅行で多くのユーザーに活用されています。',
                  tags: ['人気アプリ', 'スワイプできます'],
                },
                {
                  id: 2,
                  subject: 'フルスタックな開発🧑‍💻',
                  description:
                    'React Nativeでモバイルアプリを実装し、Rust製バックエンドやgRPCと連携🛠️\nFirebaseを活用し、安定した運用基盤を実現。フロントからサーバーまで幅広く自ら設計・実装し、個人開発ながらチーム開発水準のアーキテクチャを構築しています。',
                  tags: ['個人開発', 'フルスタック'],
                },
                {
                  id: 3,
                  subject: '6年以上継続運営🛠️',
                  description:
                    'レビューや要望をアプリ内から直接受け付け、GitHub Issueと自動連携👀\nOSの仕様変更や新路線データにも随時対応。\n毎年複数回のアップデートを継続し、長期的に安定した開発・運営体制を維持しています！',
                  tags: ['継続改善', 'ユーザー志向'],
                },
              ]}
            />
          </TriviaContainer>
        </InnerContainer>
      )}
      <Link href="/works/trainlcd" passHref aria-label="TrainLCD">
        <div>{visible && <LearnMoreButton>さらに詳しく</LearnMoreButton>}</div>
      </Link>
    </ContentContainer>
  );
};

export default WorksTrainLCD;
