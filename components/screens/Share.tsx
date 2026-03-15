'use client';
import dynamic from 'next/dynamic';
import { useFlag } from '../../hooks/useFlag';
import usePraise from '../../hooks/usePraise';
import { useScreenVisibility } from '../../hooks/useScreenVisibility';
import Button from '../Button';
import Postit from '../Postit';
import Praise from '../Praise';
import TitlePostit from '../TitlePostit';

const ShareModal = dynamic(() => import('../ShareModal'));

const ShareScreen = () => {
  const {
    value: isModalShow,
    toTrue: showModal,
    toFalse: hideModal,
  } = useFlag();
  const { visible, ref } = useScreenVisibility();
  const { count, incrementCount } = usePraise(visible, showModal);

  const handleIncrement = () => {
    incrementCount();
  };

  return (
    <>
      <section ref={ref} className="relative min-h-[calc(100vh-48px)] overflow-hidden">
        {visible && <TitlePostit title="TinyKitten" subtitle="をシェア" />}
        <div className="mt-[210px] flex flex-col items-center">
          {visible && (
            <Postit className="animate-heading-postit-left">シェアしよう！</Postit>
          )}
          {visible && (
            <div className="mt-8 flex flex-col justify-center opacity-0 animate-fade-delayed">
              <a
                href="https://twitter.com/intent/tweet?url=https://tinykitten.me&text=TinyKitten%E3%81%AE%E3%83%9D%E3%83%BC%E3%83%88%E3%83%95%E3%82%A9%E3%83%AA%E3%82%AA&via=tinykitten8&related=tinykitten8"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Button color="#15202B" className="my-3">Xでシェア</Button>
              </a>
              <a
                href="https://social-plugins.line.me/lineit/share?url=https://tinykitten.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button color="#00b900" className="my-3">LINEで送る</Button>
              </a>
              <Praise
                count={visible ? count : ''}
                onIncrement={handleIncrement}
                className="my-3"
              />
            </div>
          )}
        </div>
      </section>
      <ShareModal isOpen={isModalShow} onRequestClose={hideModal} />
    </>
  );
};

export default ShareScreen;
