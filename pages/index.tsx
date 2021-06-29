import { useRef } from 'react';
import WelcomeScreen from '../components/screens/Welcome';
import AboutScreen from '../components/screens/About';
import SkillsScreen from '../components/screens/Skills';
import WorksScreen from '../components/screens/Works';
import ShareScreen from '../components/screens/Share';
import ResumeScreen from '../components/screens/Resume';
import styled from 'styled-components';

const SectionContainer = styled.div`
  :nth-child(even) {
    background-color: ${({ theme }) => theme.bg};
  }
  :nth-child(odd) {
    background-color: ${({ theme }) => theme.subBg};
  }
`;

export default function Home(): React.ReactElement {
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
