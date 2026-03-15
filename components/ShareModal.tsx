'use client';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useActionable } from '../hooks/useActionable';
import Button from './Button';

if (typeof window !== 'undefined') {
  Modal.setAppElement('body');
}

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const customStyles: Modal.Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 'none',
    zIndex: 2,
    borderRadius: 8,
    maxWidth: '320px',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.75)',
    zIndex: 2,
  },
};

const CANCEL_DISABLED_DURATION = 3000;

const ShareModal = ({ isOpen, onRequestClose }: Props): React.ReactElement => {
  const [progressActive, setProgressActive] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setProgressActive(false);
      return;
    }
    const rafId = requestAnimationFrame(() => setProgressActive(true));
    return () => {
      cancelAnimationFrame(rafId);
      setProgressActive(false);
    };
  }, [isOpen]);

  const closable = useActionable(isOpen);

  return (
    <Modal
      closeTimeoutMS={250}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="シェアのお願い"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="flex flex-col items-center justify-center bg-box-bg p-8">
        <h3 className="text-2xl font-bold text-theme-text">シェアのお願い</h3>
        <p className="mt-3 font-bold leading-[1.5] text-theme-text">
          ほめていただき、ありがとうございます！
          <br />
          もしよければ、SNSでシェアをしていただけると嬉しいです🥺
        </p>
        <div className="mt-6 flex flex-col justify-center">
          <a
            href="https://twitter.com/intent/tweet?url=https://tinykitten.me&text=TinyKitten%E3%81%AE%E3%83%9D%E3%83%BC%E3%83%88%E3%83%95%E3%82%A9%E3%83%AA%E3%82%AA&via=tinykitten8&related=tinykitten8"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Button color="#15202B" className="relative my-2">Xでシェア</Button>
          </a>
          <a
            href="https://social-plugins.line.me/lineit/share?url=https://tinykitten.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button color="#00b900" className="relative my-2">LINEで送る</Button>
          </a>
          <div className="my-3 h-px bg-theme-text/50" />
          <button
            type="button"
            onClick={onRequestClose}
            disabled={!closable}
            className="relative min-w-[210px] h-12 cursor-pointer rounded-[1px] text-[1.2rem] text-white shadow-[0_3px_6px_rgba(0,0,0,0.16)] overflow-hidden disabled:cursor-not-allowed"
            style={{ backgroundColor: 'var(--color-cancel-bg)' }}
          >
            <div
              className="absolute left-0 top-0 h-full bg-black/50"
              style={{
                width: progressActive ? '100%' : '0%',
                transition: progressActive
                  ? `width ${CANCEL_DISABLED_DURATION}ms linear`
                  : 'none',
              }}
            />
            <span className="relative z-[1]">シェアしない</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
