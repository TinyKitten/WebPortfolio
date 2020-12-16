import React, { useRef, useState } from 'react';
import SkillsCircle from '../../SkillsCircle';
import TitlePostit from '../../TitlePostit';
import ScreenVisibleProvider from '../ScreenVisibleProvider';
import styles from './styles.module.css';
import { ReactComponent as JSIcon } from '../../../assets/marks/js.svg';
import { ReactComponent as TSIcon } from '../../../assets/marks/ts.svg';
import { ReactComponent as VueIcon } from '../../../assets/marks/vue.svg';
import { ReactComponent as ReactIcon } from '../../../assets/marks/react.svg';

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
              <SkillsCircle icon={VueIcon} name="Vue.js" />
              <SkillsCircle icon={ReactIcon} name="React (Native)" />
            </div>
          )}
        </div>
      </section>
    </ScreenVisibleProvider>
  );
};

export default SkillsScreen;
