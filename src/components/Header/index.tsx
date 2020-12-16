import React from 'react';
import styles from './styles.module.css';
import { ReactComponent as TinyKittenIcon } from '../../assets/tinykitten.svg';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.title}>
        <TinyKittenIcon width={32} height={32} />
      </a>
    </header>
  );
};

export default Header;
