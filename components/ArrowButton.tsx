'use client';
import dynamic from 'next/dynamic';
import { ScrollLink } from 'react-scroll';
import styled from 'styled-components';
import {
  arrowAnimationLarge,
  arrowAnimationSmall,
} from './screens/Welcome.styled';

const ArrowIcon = dynamic(() => import('./ArrowIcon'));

const StyledArrow = styled(ScrollLink(ArrowIcon))`
  position: absolute;
  width: 64px;
  height: auto;
  bottom: 64px;
  animation: ${arrowAnimationLarge} 1s forwards;
  cursor: pointer;
  @media (max-width: 800px) {
    bottom: 32px;
    animation: ${arrowAnimationSmall} 1s forwards;
  }
`;

export const ArrowButton = () => (
  <StyledArrow to="about" smooth="ease" duration={500} offset={-48} />
);
