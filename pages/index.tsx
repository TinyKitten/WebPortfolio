import { useRef } from 'react';
import WelcomeScreen from '../components/screens/Welcome';
import AboutScreen from '../components/screens/About';
import SkillsScreen from '../components/screens/Skills';
import WorksScreen from '../components/screens/Works';
import ShareScreen from '../components/screens/Share';

export default function Home(): React.ReactElement {
  const aboutScreenRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <WelcomeScreen aboutScreenRef={aboutScreenRef} />
      <AboutScreen ref={aboutScreenRef} />
      <SkillsScreen />
      <WorksScreen />
      <ShareScreen />
    </div>
  );
}
