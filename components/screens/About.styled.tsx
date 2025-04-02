'use client';
import styled, { keyframes } from 'styled-components';
import Postit from '../Postit';
import TinyKittenIcon from '../TinyKittenIcon';
import { SwiperSlide } from 'swiper/react';

export const Container = styled.section`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
`;

export const ContentContainer = styled.div`
  padding-top: 210px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const LogoWrapper = styled.div`
  position: relative;
`;

export const headingPostitAnimation = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-64px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0) rotate(-5deg)',
  },
});

export const sliderAnimation = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateX(0)',
  },
  '25%': {
    opacity: 1,
  },
  '50%': {
    transform: 'translateX(-5%)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateX(0)',
  },
});

export const StyledPostit = styled(Postit)`
  position: absolute;
  transform: rotate(-5deg);
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

export const NameText = styled.h2`
  margin-top: 32px;
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  color: ${({ theme }) => theme.headingText};
`;

export const BioText = styled.p`
  text-align: left;
  max-width: calc(100% - 64px);
  line-height: 1.75;
  margin-top: 12px;
  color: ${({ theme }) => theme.text};
  @media (min-width: 800px) {
    text-align: center;
  }
`;

export const SwiperContainer = styled.div`
  margin-top: 48px;
  margin-bottom: 64px;
`;

export const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  width: 100%;
  animation: ${sliderAnimation} 0.75s 0.5s ease forwards;
`;
