'use client';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import styled from 'styled-components';
import { DynamicLoading } from '../components/DynamicLoading';
import AboutScreen from '../components/screens/About';
import WelcomeScreen from '../components/screens/Welcome';

const ResumeScreen = dynamic(() => import('../components/screens/Resume'), {
  loading: DynamicLoading,
});
const ShareScreen = dynamic(() => import('../components/screens/Share'), {
  loading: DynamicLoading,
});
const SkillsScreen = dynamic(() => import('../components/screens/Skills'), {
  loading: DynamicLoading,
});
const WorksScreen = dynamic(() => import('../components/screens/Works'), {
  loading: DynamicLoading,
});

const SectionContainer = styled.div`
  :nth-child(even) {
    background-color: ${({ theme }) => theme.bg};
  }
  :nth-child(odd) {
    background-color: ${({ theme }) => theme.subBg};
  }
`;

export default function Page() {
  const aboutScreenRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <SectionContainer>
        <WelcomeScreen aboutScreenRef={aboutScreenRef} />
      </SectionContainer>
      <SectionContainer>
        <AboutScreen ref={aboutScreenRef} />
      </SectionContainer>
      <SectionContainer>
        <SkillsScreen />
      </SectionContainer>
      <SectionContainer>
        <ResumeScreen />
      </SectionContainer>
      <SectionContainer>
        <WorksScreen />
      </SectionContainer>
      <SectionContainer>
        <ShareScreen />
      </SectionContainer>
    </>
  );
}
