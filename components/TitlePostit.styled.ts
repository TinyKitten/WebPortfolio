'use client';
import styled from 'styled-components';
import { titlePostitAnimation } from '../constants/keyframets';
import VerticalPostitIcon from './VerticalPostitIcon';

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 32px;
  filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.16));
  transform: 'translateY(-147px)';
  animation: ${titlePostitAnimation} 1s ease forwards;
`;

export const VerticalPostit = styled(VerticalPostitIcon)`
  position: relative;
`;

export const TitleTextContainer = styled.div`
  position: absolute;
  left: auto;
  right: auto;
  top: auto;
  bottom: calc(50% - 10.5px);
  width: 100%;
  text-align: center;
`;

export const TitleText = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  font-size: 1.25rem;
  white-space: pre-wrap;
`;

export const SubtitleText = styled.p`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.5;
`;
