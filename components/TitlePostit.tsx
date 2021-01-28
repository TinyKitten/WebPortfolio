import styles from '../styles/components/TitlePostit.module.css';
import VerticalPostitIcon from './VerticalPostitIcon';

type Props = {
  title: string;
  subtitle: string;
  className?: string;
};

const TitlePostit: React.FC<Props> = ({
  className,
  title,
  subtitle,
}: Props) => {
  return (
    <div className={[className, styles.titlePostit].join(' ')}>
      <VerticalPostitIcon className={styles.titlePostitBg} />
      <div className={styles.titleText}>
        <p className={styles.appName}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
};

export default TitlePostit;
