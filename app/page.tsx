import dynamic from 'next/dynamic';
import AboutScreen from '../components/screens/About';
import WelcomeScreen from '../components/screens/Welcome';

const ResumeScreen = dynamic(() => import('../components/screens/Resume'));
const ShareScreen = dynamic(() => import('../components/screens/Share'));
const SkillsScreen = dynamic(() => import('../components/screens/Skills'));
const WorksScreen = dynamic(() => import('../components/screens/Works'));

export default function Page() {
  return (
    <>
      <div className="bg-sub-bg">
        <WelcomeScreen />
      </div>
      <div className="bg-theme-bg">
        <AboutScreen />
      </div>
      <div className="bg-sub-bg">
        <SkillsScreen />
      </div>
      <div className="bg-theme-bg">
        <ResumeScreen />
      </div>
      <div className="bg-sub-bg">
        <WorksScreen />
      </div>
      <div className="bg-theme-bg">
        <ShareScreen />
      </div>
    </>
  );
}
