import Link from 'next/link';
import Button from '../components/Button';
import Postit from '../components/Postit';
import styles from '../styles/pages/404.module.css';

const NoMatchPage: React.FC = () => (
  <div className={styles.container}>
    <Postit className={styles.postit}>Not Found</Postit>
    <p className={styles.message}>お探しのページは見つかりませんでした。</p>
    <Link href="/" passHref>
      <div>
        <Button>トップ</Button>
      </div>
    </Link>
  </div>
);

export default NoMatchPage;
