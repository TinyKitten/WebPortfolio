import styles from '../styles/components/Header.module.css';
import Link from 'next/link';
import TinyKittenIcon from './TinyKittenIcon';
import { forwardRef } from 'react';

const ForwardedIcon = forwardRef(() => (
  <TinyKittenIcon width={32} height={32} />
));

ForwardedIcon.displayName = 'TinyKittenIcon';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <Link href="/">
          <div>
            <ForwardedIcon />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
