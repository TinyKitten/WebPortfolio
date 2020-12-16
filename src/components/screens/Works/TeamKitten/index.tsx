import React, { useRef, useState } from 'react';
import Button from '../../../Button';
import Postit from '../../../Postit';
import ScreenVisibleProvider from '../../ScreenVisibleProvider';
import styles from './styles.module.css';
import TeamKittenIMG from '../../../../assets/works/teamkitten.png';
import { Link } from 'react-router-dom';

const WorksTeamKitten: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <div className={styles.content} ref={ref}>
        {visible && (
          <div className={styles.logoWrapper}>
            <Postit className={styles.postit}>TeamKitten</Postit>
            <img
              className={styles.image}
              src={TeamKittenIMG}
              alt="TeamKitten"
            />
          </div>
        )}
        {visible && (
          <p className={styles.description}>
            TeamKittenというネットサークルの
            <br />
            メンバー管理API設計・実装、
            <br />
            ウェブサイトの開発を担当しました。
            <br />
            現在はNuxt.jsを用いており、
            <br />
            コンテンツを完全に静的に配信することにより
            <br />
            高速な表示とより良いUXを実現しました。
          </p>
        )}
        <Link to="/works/teamkitten">
          {visible && (
            <Button className={styles.learnMoreBtn}>さらに詳しく</Button>
          )}
        </Link>
      </div>
    </ScreenVisibleProvider>
  );
};

export default WorksTeamKitten;
