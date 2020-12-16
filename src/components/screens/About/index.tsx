import React, {
  forwardRef,
  ForwardRefRenderFunction,
  MutableRefObject,
  useRef,
  useState,
} from 'react';
import Postit from '../../Postit';
import styles from './styles.module.css';
import { ReactComponent as TinyKittenIcon } from '../../../assets/tinykitten.svg';
import TitlePostit from '../../TitlePostit';
import ScreenVisibleProvider from '../ScreenVisibleProvider';

const AboutScreen: ForwardRefRenderFunction<HTMLDivElement, unknown> = (
  props: unknown,
  forwardefRef:
    | ((instance: HTMLDivElement | null) => void)
    | MutableRefObject<HTMLDivElement | null>
    | null
) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <div ref={ref}>
        <section ref={forwardefRef} className={styles.container}>
          {visible && (
            <TitlePostit
              className={styles.titlePostit}
              title="TinyKitten"
              subtitle="って誰？"
            />
          )}
          <div className={styles.content}>
            <div className={styles.logoWrapper}>
              {visible && (
                <Postit className={styles.postit}>デザインもできます</Postit>
              )}
              <TinyKittenIcon className={styles.logo} />
            </div>
            <h2 className={styles.name}>TinyKitten</h2>
            <p className={styles.bio}>
              東京都豊島区在住のフリーの
              <br />
              フロントエンドエンジニア。
              <br />
              タイニーキトゥンと読みます。
              <br />
              でも、「きったん」と呼ばれることが多いです。
            </p>
          </div>
        </section>
      </div>
    </ScreenVisibleProvider>
  );
};

export default forwardRef<HTMLDivElement>(AboutScreen);