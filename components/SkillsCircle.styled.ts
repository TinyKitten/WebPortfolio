'use client';
import styled from 'styled-components';
import { skillCircleAnimation } from '../constants/keyframets';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const SkillImageWrapper = styled.div`
  overflow: hidden;
  background: ${({ theme }) => theme.boxBg};
  width: 120px;
  height: 120px;
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 18px;
  animation: ${skillCircleAnimation} 1s ease forwards;
`;

export const SkillName = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

export const IconContainer = styled.div`
  > svg {
    width: auto;
    height: 64px;
    max-width: 64px;
  }
`;
