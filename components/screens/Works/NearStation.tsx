import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import styled from 'styled-components';
import NearStationImage from '../../../assets/works/nearstation.png';
import {
  headingPostitAnimation,
  imageAnimation,
} from '../../../constants/keyframets';
import useScreenVisibility from '../../../hooks/useScreenVisibility';
import Button from '../../Button';
import Postit from '../../Postit';

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh - 48px);
`;

const Description = styled.p`
  text-align: center;
  max-width: calc(100% - 64px);
  line-height: 1.75;
  margin-top: 48px;
  color: ${({ theme }) => theme.headingText};
  animation: ${imageAnimation} 1s ease forwards;
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
  width: 320px;
  max-width: 75%;
  height: auto;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.16));
  animation: ${imageAnimation} 1s ease forwards;
`;

const LearnMoreButton = styled(Button)`
  margin: 32px 0;
  animation: ${imageAnimation} 1s ease forwards;
`;

const WorksNearStation: React.FC = () => {
  const ref = useRef(null);
  const visible = useScreenVisibility(ref);

  return (
    <ContentContainer ref={ref}>
      {visible && (
        <LogoContainer>
          <StyledPostit>NearStation</StyledPostit>
          <ImageContainer>
            <Image src={NearStationImage} alt="NearStation" />
          </ImageContainer>
        </LogoContainer>
      )}
      {visible && (
        <Description>最寄り駅とその路線をすぐに知れるWebアプリ</Description>
      )}
      <Link href="/works/nearstation" passHref>
        <div>{visible && <LearnMoreButton>さらに詳しく</LearnMoreButton>}</div>
      </Link>
    </ContentContainer>
  );
};

export default WorksNearStation;
