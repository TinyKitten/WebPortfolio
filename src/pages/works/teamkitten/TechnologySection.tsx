import React, { useRef, useState } from 'react';
import SkillsCircle from '../../../components/SkillsCircle';
import TitlePostit from '../../../components/TitlePostit';
import { ReactComponent as JSIcon } from '../../../assets/marks/js.svg';
import { ReactComponent as NuxtJSIcon } from '../../../assets/marks/nuxtjs.svg';
import ScreenVisibleProvider from '../../../components/screens/ScreenVisibleProvider';
import styles from './styles.module.css';

const TeamKittenTechnologySection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <section className={styles.container} ref={ref}>
        {visible && (
          <TitlePostit
            className={styles.titlePostit}
            title="TeamKitten"
            subtitle="使用技術"
          />
        )}
        {visible && (
          <article className={styles.techs}>
            <SkillsCircle icon={JSIcon} name="JavaScript" />
            <SkillsCircle icon={NuxtJSIcon} name="NuxtJS" />
          </article>
        )}
      </section>
    </ScreenVisibleProvider>
  );
};

export default TeamKittenTechnologySection;
