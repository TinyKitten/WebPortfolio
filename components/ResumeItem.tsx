import { Resume } from '../models/Resume';
import styles from '../styles/components/ResumeItem.module.css';

type Props = {
  resume: Resume;
};

const ResumeItem: React.FC<Props> = ({ resume }: Props) => {
  const period =
    resume.startAtFullYear === resume.endAtFullYear
      ? `${resume.startAtFullYear}`
      : `${resume.startAtFullYear}-${resume.endAtFullYear}`;
  return (
    <div className={styles.root}>
      <time className={styles.period}>{period}</time>
      <h3 className={styles.companyName}>{resume.companyName}</h3>
      <p className={styles.description}>{resume.description}</p>
    </div>
  );
};

export default ResumeItem;
