'use client';
import styled, { keyframes } from 'styled-components';

export const Container = styled.section`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const tipsPostitAnimation = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-32px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const SkillsContainer = styled.div`
  width: 75%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 32px;
  animation: ${tipsPostitAnimation} 1s ease forwards;
  margin-top: calc(144px + 32px);
  margin-bottom: 32px;
  @media (min-width: 800px) {
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;
