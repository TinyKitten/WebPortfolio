import { useRef, useState } from 'react';
import styles from '../../styles/components/screens/Skills.module.css';
import ScreenVisibleProvider from '../../providers/ScreenVisibleProvider';
import TitlePostit from '../TitlePostit';
import SkillsCircle from '../SkillsCircle';
import JSIcon from '../marks/JSIcon';
import TSIcon from '../marks/TSIcon';
import VueJSIcon from '../marks/VueJSIcon';
import ReactIcon from '../marks/ReactIcon';

const SkillsScreen: React.FC = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <section className={styles.container} ref={ref}>
        {visible && (
          <TitlePostit
            className={styles.titlePostit}
            title="TinyKitten"
            subtitle="のスキル"
          />
        )}
        <div className={styles.content}>
          {visible && (
            <div className={styles.skills}>
              <SkillsCircle icon={JSIcon} name="JavaScript" />
              <SkillsCircle icon={TSIcon} name="TypeScript" />
              <SkillsCircle icon={VueJSIcon} name="Vue.js" />
              <SkillsCircle icon={ReactIcon} name="React (Native)" />
            </div>
          )}
        </div>
      </section>
    </ScreenVisibleProvider>
  );
};

export default SkillsScreen;
