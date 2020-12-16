import React from 'react';
import styles from './styles.module.css';

type Props = {
  name: string;
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
};

const SkillsCircle: React.FC<Props> = ({ name, icon: Icon }: Props) => {
  return (
    <div className={styles.skill}>
      <div className={styles.skillImageWrapper}>
        <Icon className={styles.skillImage} />
      </div>
      <p className={styles.skillName}>{name}</p>
    </div>
  );
};

export default SkillsCircle;
