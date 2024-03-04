import dynamic from 'next/dynamic';
import { DynamicLoading } from '../components/DynamicLoading';
import AboutScreen from '../components/screens/About';
import WelcomeScreen from '../components/screens/Welcome';
import { SectionContainer } from './page.styled';

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

export default function Page() {
  return (
    <>
      <SectionContainer>
        <WelcomeScreen />
      </SectionContainer>
      <SectionContainer>
        <AboutScreen />
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
