import React, { useRef, useState } from 'react';
import SkillsCircle from '../../../components/SkillsCircle';
import TitlePostit from '../../../components/TitlePostit';
import { ReactComponent as TSIcon } from '../../../assets/marks/ts.svg';
import { ReactComponent as ReactIcon } from '../../../assets/marks/react.svg';
import { ReactComponent as NestJSIcon } from '../../../assets/marks/nestjs.svg';
import { ReactComponent as MySQLIcon } from '../../../assets/marks/mysql.svg';
import ScreenVisibleProvider from '../../../components/screens/ScreenVisibleProvider';
import styles from './styles.module.css';

const TrainLCDTechnologySection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <section className={styles.container} ref={ref}>
        {visible && (
          <TitlePostit
            className={styles.titlePostit}
            title="TrainLCD"
            subtitle="使用技術"
          />
        )}
        {visible && (
          <article className={styles.techs}>
            <SkillsCircle icon={TSIcon} name="TypeScript" />
            <SkillsCircle icon={ReactIcon} name="React Native" />
            <SkillsCircle icon={NestJSIcon} name="NestJS" />
            <SkillsCircle icon={MySQLIcon} name="MySQL" />
          </article>
        )}
      </section>
    </ScreenVisibleProvider>
  );
};

export default TrainLCDTechnologySection;
