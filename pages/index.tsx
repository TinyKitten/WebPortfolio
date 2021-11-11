import { useRef } from 'react';
import styled from 'styled-components';
import AboutScreen from '../components/screens/About';
import ResumeScreen from '../components/screens/Resume';
import ShareScreen from '../components/screens/Share';
import SkillsScreen from '../components/screens/Skills';
import WelcomeScreen from '../components/screens/Welcome';
import WorksScreen from '../components/screens/Works';

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
export async function getStaticProps(): Promise<{
  props: unknown;
  revalidate: number;
}> {
  return {
    props: {},
    revalidate: 60,
  };
}
