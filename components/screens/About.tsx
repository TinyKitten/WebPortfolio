import {
  forwardRef,
  ForwardRefRenderFunction,
  MutableRefObject,
  useRef,
  useState,
} from 'react';
import TitlePostit from '../TitlePostit';
import Postit from '../Postit';
import TinyKittenIcon from '../TinyKittenIcon';
import ScreenVisibleProvider from '../../providers/ScreenVisibleProvider';
import styled from 'styled-components';

const Container = styled.section`
  position: relative;
  min-height: calc(100vh - 48px);
  overflow: hidden;
`;

const StyledTitlePostit = styled(TitlePostit)`
  animation: titlePostitAnimation 1s ease forwards;
  @keyframes titlePostitAnimation {
    from {
      transform: translateY(-147px);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const ContentContainer = styled.div`
  padding-top: 210px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  position: relative;
`;

const StyledPostit = styled(Postit)`
  position: absolute;
  transform: rotate(-5deg);
  left: -44px;
  top: -24px;
  z-index: 1;
  animation: headingPostitAnimation 1s ease forwards;
  @keyframes headingPostitAnimation {
    from {
      opacity: 0;
      transform: translateY(-64px);
    }
    to {
      opacity: 1;
      transform: translateY(0) rotate(-5deg);
    }
  }
`;

const Logo = styled(TinyKittenIcon)`
  width: 120px;
  height: 120px;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.16));
`;

const NameText = styled.h2`
  margin-top: 32px;
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  color: ${({ theme }) => theme.headingText};
`;

const BioText = styled.p`
  text-align: center;
  max-width: calc(100% - 64px);
  line-height: 1.75;
  margin-top: 12px;
  color: ${({ theme }) => theme.text};
`;

const AboutScreen: ForwardRefRenderFunction<HTMLDivElement> = (
  props,
  forwardefRef:
    | ((instance: HTMLDivElement | null) => void)
    | MutableRefObject<HTMLDivElement | null>
    | null
) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <div ref={ref}>
        <Container ref={forwardefRef}>
          {visible && (
            <StyledTitlePostit title="TinyKitten" subtitle="って誰？" />
          )}
          <ContentContainer>
            <LogoWrapper>
              {visible && <StyledPostit>デザインもできます</StyledPostit>}
              <Logo />
            </LogoWrapper>
            <NameText>TinyKitten</NameText>
            <BioText>
              東京都豊島区在住のフリーのフロントエンドエンジニア。
              <br />
              タイニーキトゥンと読みます。
              <br />
              でも、「きったん」と呼ばれることが多いです。
              <br />
              Reactの案件を基本的に引き受けています。
              <br />
              デザインとネイティブアプリの知識があることが強みです。
            </BioText>
          </ContentContainer>
        </Container>
      </div>
    </ScreenVisibleProvider>
  );
};

export default forwardRef<HTMLDivElement>(AboutScreen);
