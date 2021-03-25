import { useRef } from 'react';
import WelcomeScreen from '../components/screens/Welcome';
import AboutScreen from '../components/screens/About';
import SkillsScreen from '../components/screens/Skills';
import WorksScreen from '../components/screens/Works';
import ShareScreen from '../components/screens/Share';
import styles from '../styles/pages/Index.module.css';

export default function Home(): React.ReactElement {
  const aboutScreenRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <WelcomeScreen aboutScreenRef={aboutScreenRef} className={styles.child} />
      <AboutScreen ref={aboutScreenRef} className={styles.child} />
      <SkillsScreen className={styles.child} />
      <WorksScreen className={styles.child} />
      <ShareScreen className={styles.child} />
    </div>
  );
}
