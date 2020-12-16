import React from 'react';
import { ReactComponent as PostitIcon } from '../../assets/postit.svg';
import styles from './styles.module.css';

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Postit: React.FC<Props> = ({ className, children }: Props) => (
  <div className={[className, styles.postit].join(' ')}>
    <PostitIcon width={210} height={48} className={styles.bg} />
    <p className={styles.text}>{children}</p>
  </div>
);

export default Postit;
