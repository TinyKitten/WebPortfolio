import dynamic from 'next/dynamic';
import { useRef } from 'react';
import styled from 'styled-components';
import WelcomeScreen from '../components/screens/Welcome';

const CustomDynamicLoading = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 100vh;
  width: 100vw;
`;

const AboutScreen = dynamic(() => import('../components/screens/About'), {
  loading: CustomDynamicLoading,
});
const ResumeScreen = dynamic(() => import('../components/screens/Resume'), {
  loading: CustomDynamicLoading,
});
const ShareScreen = dynamic(() => import('../components/screens/Share'), {
  loading: CustomDynamicLoading,
});
const SkillsScreen = dynamic(() => import('../components/screens/Skills'), {
  loading: CustomDynamicLoading,
});
const WorksScreen = dynamic(() => import('../components/screens/Works'), {
  loading: CustomDynamicLoading,
});

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
