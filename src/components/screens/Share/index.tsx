import React, { useCallback, useRef, useState } from 'react';
import Button from '../../Button';
import Postit from '../../Postit';
import Praise from '../../Praise';
import TitlePostit from '../../TitlePostit';
import ScreenVisibleProvider from '../ScreenVisibleProvider';
import styles from './styles.module.css';

const ShareScreen: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  const handleIncrement = useCallback(() => {
    // TODO: implement
  }, []);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <section className={styles.container} ref={ref}>
        {visible && (
          <TitlePostit
            className={styles.titlePostit}
            title="TinyKitten"
            subtitle="をシェア"
          />
        )}
        <div className={styles.content}>
          {visible && <Postit className={styles.postit}>シェアしよう！</Postit>}
          {visible && (
            <p className={styles.links}>
              <a
                href="https://twitter.com/intent/tweet?url=https://tinykitten.me&text=TinyKittenのポートフォリオ&via=tinykitten8&related=tinykitten8"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Button
                  className={styles.shareButton}
                  color="#1DA1F2"
                  text="Twitter"
                />
              </a>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://tinykitten.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className={styles.shareButton}
                  color="#3E54A4"
                  text="Facebook"
                />
              </a>
              <Praise
                count={0}
                onIncrement={handleIncrement}
                className={styles.shareButton}
              />
              {/* <app-praise-button :count="praiseCount" className="shareButton" /> */}
            </p>
          )}
        </div>
      </section>
    </ScreenVisibleProvider>
  );
};

export default ShareScreen;
