import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  fadeAnimation,
  headingPostitAnimation,
  titlePostitAnimation,
} from '../../constants/keyframets';
import usePraise from '../../hooks/usePraise';
import useScreenVisibility from '../../hooks/useScreenVisibility';
import Button from '../Button';
import Postit from '../Postit';
import Praise from '../Praise';
import TitlePostit from '../TitlePostit';

const ShareModal = dynamic(() => import('../ShareModal'));

const Container = styled.section`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
`;

const StyledTitlePostit = styled(TitlePostit)`
  animation: ${titlePostitAnimation} 1s ease forwards;
`;

const ContentContainer = styled.div`
  padding-top: 210px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledPostit = styled(Postit)`
  animation: ${headingPostitAnimation} 1s ease forwards;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 32px;
  opacity: 0;
  animation: ${fadeAnimation} 1s ease 0.25s forwards;
`;

const ShareButton = styled(Button)`
  margin: 12px 0;
`;

const StyledPraise = styled(Praise)`
  margin: 12px 0;
`;

const ShareScreen: React.FC = () => {
  const ref = useRef(null);
  const [isModalShow, setIsModalShow] = useState(false);

  const visible = useScreenVisibility(ref);

  const handleExceeded = () => setIsModalShow(true);

  const { count, incrementCount } = usePraise(visible, handleExceeded);

  const closeModal = () => setIsModalShow(false);

  const handleIncrement = () => {
    incrementCount();
  };

  return (
    <>
      <Container ref={ref}>
        {visible && (
          <StyledTitlePostit title="TinyKitten" subtitle="をシェア" />
        )}
        <ContentContainer>
          {visible && <StyledPostit>シェアしよう！</StyledPostit>}
          {visible && (
            <LinksContainer>
              <a
                href="https://twitter.com/intent/tweet?url=https://tinykitten.me&text=TinyKittenのポートフォリオ&via=tinykitten8&related=tinykitten8"
                target="_blank"
                rel="noreferrer noopener"
              >
                <ShareButton color="#1DA1F2">Twitterでシェア</ShareButton>
              </a>
              <a
                href="https://social-plugins.line.me/lineit/share?url=https://tinykitten.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ShareButton color="#00b900">LINEで送る</ShareButton>
              </a>
              <StyledPraise count={count} onIncrement={handleIncrement} />
            </LinksContainer>
          )}
        </ContentContainer>
      </Container>
      <ShareModal isOpen={isModalShow} onRequestClose={closeModal} />
    </>
  );
};

export default ShareScreen;
