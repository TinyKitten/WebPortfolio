import dynamic from 'next/dynamic';
import { MutableRefObject, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import Postit from '../Postit';
import TinyKittenIcon from '../TinyKittenIcon';

const ArrowIcon = dynamic(() => import('../ArrowIcon'));

type Props = {
  aboutScreenRef: MutableRefObject<HTMLDivElement | null>;
};

const Container = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  position: relative;
`;

const headingPostitAnimation = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-64px) rotate(0deg)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0) rotate(5deg)',
  },
});

const StyledPostit = styled(Postit)`
  position: absolute;
  transform: translateY(0) rotate(5deg);
  left: -44px;
  top: -24px;
  z-index: 1;
  animation: ${headingPostitAnimation} 1s ease forwards;
`;

const Logo = styled(TinyKittenIcon)`
  width: 120px;
  height: 120px;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.16));
`;

const MyName = styled.h1`
  margin-top: 24px;
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  color: ${({ theme }) => theme.headingText};
`;

const arrowAnimation = keyframes({
  from: {
    opacity: 0,
    transform: 'translate3d(0, -32px, 0)',
  },
  to: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  },
});

const ArrowLink = styled(ArrowIcon)`
  position: absolute;
  width: 64px;
  height: auto;
  bottom: 32px;
  animation: ${arrowAnimation} 1s forwards;
  cursor: pointer;
`;

const WelcomeScreen: React.FC<Props> = ({ aboutScreenRef }: Props) => {
  const handleArrowClick = useCallback(
    () =>
      aboutScreenRef.current?.scrollIntoView({
        behavior: 'smooth',
      }),
    [aboutScreenRef]
  );

  return (
    <Container>
      <LogoWrapper>
        <StyledPostit>Frontend Engineer</StyledPostit>
        <Logo width={120} height={120} />
      </LogoWrapper>
      <MyName>TinyKitten</MyName>
      <ArrowLink onClick={handleArrowClick} />
    </Container>
  );
};

export default WelcomeScreen;
