import { useContext } from 'react';
import Modal from 'react-modal';
import styled, { ThemeContext } from 'styled-components';
import Button from './Button';

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

const Container = styled.div`
  background-color: ${({ theme }) => theme.boxBg};
  padding: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Heading = styled.h3`
  font-weight: bold;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  line-height: 1.5;
  margin-top: 12px;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 24px;
  opacity: 1;
`;

const ShareButton = styled(Button)`
  margin: 8px 0;
`;

const ShareModal = ({ isOpen, onRequestClose }: Props): React.ReactElement => {
  const themeContext = useContext(ThemeContext);

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
      <Container>
        <Heading>シェアのお願い</Heading>
        <Description>
          ほめていただき、ありがとうございます！
          <br />
          もしよければ、SNSでシェアをしていただけると嬉しいです🥺
        </Description>
        <LinksContainer>
          <a
            href="https://twitter.com/intent/tweet?url=https://tinykitten.me&text=TinyKittenのポートフォリオ&via=tinykitten8&related=tinykitten8"
            target="_blank"
            rel="noreferrer noopener"
          >
            <ShareButton color="#1DA1F2">Twitter</ShareButton>
          </a>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https://tinykitten.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ShareButton color="#3E54A4">Facebook</ShareButton>
          </a>
          <ShareButton onClick={onRequestClose} color={themeContext.cancelBg}>
            シェアしない
          </ShareButton>
        </LinksContainer>
      </Container>
    </Modal>
  );
};
export default ShareModal;
