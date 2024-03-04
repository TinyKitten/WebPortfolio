'use client';
import styled, { keyframes } from 'styled-components';
import Postit from '../Postit';
import TinyKittenIcon from '../TinyKittenIcon';

export const Container = styled.section`
  position: relative;
  min-height: 100vh;
  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }

  margin-top: -48px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LogoWrapper = styled.div`
  position: relative;
`;

export const headingPostitAnimation = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-64px) rotate(0deg)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0) rotate(5deg)',
  },
});

export const StyledPostit = styled(Postit)`
  position: absolute;
  transform: translateY(0) rotate(5deg);
  left: -44px;
  top: -24px;
  z-index: 1;
  animation: ${headingPostitAnimation} 1s ease forwards;
`;

export const Logo = styled(TinyKittenIcon)`
  width: 120px;
  height: 120px;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.16));
`;

export const MyName = styled.h1`
  margin-top: 24px;
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  color: ${({ theme }) => theme.headingText};
`;

export const arrowAnimationSmall = keyframes({
  from: {
    opacity: 0,
    transform: 'translate3d(0, -16px, 0)',
  },
  to: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  },
});

export const arrowAnimationLarge = keyframes({
  from: {
    opacity: 0,
    transform: 'translate3d(0, -32px, 0)',
  },
  to: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  },
});
