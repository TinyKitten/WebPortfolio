'use client';
import { ScrollLink } from 'react-scroll';
import styled from 'styled-components';
import ArrowIcon from './ArrowIcon';
import {
  arrowAnimationLarge,
  arrowAnimationSmall,
} from './screens/Welcome.styled';

const StyledArrow = styled(ArrowIcon)`
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

const ScrollableArrow = ScrollLink(StyledArrow);

export const ArrowButton = () => (
  <ScrollableArrow to="about" smooth="ease" duration={500} offset={-48} />
);
