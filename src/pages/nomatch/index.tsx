import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Postit from '../../components/Postit';
import styles from './styles.module.css';

const NoMatchPage: React.FC = () => (
  <div className={styles.container}>
    <Postit className={styles.postit}>Not Found</Postit>
    <p className={styles.message}>お探しのページは見つかりませんでした。</p>
    <Link to="/">
      <Button>トップ</Button>
    </Link>
  </div>
);

export default NoMatchPage;
