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
} from './About.styled';

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
            タイニーキトゥンと読みます。
            <br />
            でも、「きったん」と呼ばれることが多いです。
            <br />
            Reactの案件を基本的に引き受けています。
            <br />
            デザインとネイティブアプリ開発の知識があることが強みです。
          </BioText>
        </ContentContainer>
      </Container>
    </ScrollElement>
  );
};

export default AboutScreen;
