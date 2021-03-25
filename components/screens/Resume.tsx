import styles from '../../styles/components/screens/Resume.module.css';
import React, { useRef, useState } from 'react';
import TitlePostit from '../TitlePostit';
import ScreenVisibleProvider from '../../providers/ScreenVisibleProvider';
import resumeFixutre from '../../fixtures/resume.json';
import ResumeItem from '../ResumeItem';

type Props = {
  className?: string;
};

const ResumeScreen: React.FC<Props> = ({ className }: Props) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <section ref={ref} className={[styles.container, className].join(' ')}>
        {visible && (
          <TitlePostit
            className={styles.titlePostit}
            title="TinyKitten"
            subtitle="の職歴"
          />
        )}
        <div className={styles.content}>
          <div className={styles.tree}>
            <div className={styles.startItem}>
              <p>START</p>
            </div>
            {resumeFixutre.map((r) => (
              <ResumeItem key={r.companyName} resume={r} />
            ))}
            <div className={styles.endItem}>
              <p>PRESENT</p>
            </div>
          </div>
        </div>
      </section>
    </ScreenVisibleProvider>
  );
};

export default ResumeScreen;
