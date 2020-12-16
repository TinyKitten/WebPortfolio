import React from 'react';
import styles from './styles.module.css';
import { ReactComponent as TinyKittenIcon } from '../../assets/tinykitten.svg';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.title}>
        <TinyKittenIcon width={32} height={32} />
      </Link>
    </header>
  );
};

export default Header;
