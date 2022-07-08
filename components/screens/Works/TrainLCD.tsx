import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import TrainLCDImage from '../../../assets/works/trainlcd.png';
import {
  headingPostitAnimation,
  imageAnimation,
} from '../../../constants/keyframets';
import ScreenVisibleProvider from '../../../providers/ScreenVisibleProvider';
import Button from '../../Button';
import Postit from '../../Postit';

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - 48px);
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
  width: 480px;
  max-width: 75%;
  height: auto;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.16));
  animation: ${imageAnimation} 1s ease forwards;
`;

const Description = styled.p`
  text-align: center;
  max-width: calc(100% - 64px);
  line-height: 1.75;
  margin-top: 48px;
  color: ${({ theme }) => theme.headingText};
  animation: ${imageAnimation} 1s ease forwards;
`;

const LearnMoreButton = styled(Button)`
  margin: 32px 0;
  animation: ${imageAnimation} 1s ease forwards;
`;

const WorksTrainLCD: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <ContentContainer ref={ref}>
        {visible && (
          <LogoContainer>
            <StyledPostit>TrainLCD</StyledPostit>
            <ImageContainer>
              <Image src={TrainLCDImage} alt="TrainLCD" />
            </ImageContainer>
          </LogoContainer>
        )}

        {visible && (
          <Description>
            日本全国の鉄道路線で使える新感覚のナビゲーションアプリです。
          </Description>
        )}
        <Link href="/works/trainlcd" passHref>
          <div>
            {visible && <LearnMoreButton>さらに詳しく</LearnMoreButton>}
          </div>
        </Link>
      </ContentContainer>
    </ScreenVisibleProvider>
  );
};

export default WorksTrainLCD;
