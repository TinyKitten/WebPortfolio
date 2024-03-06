'use client';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import {
  fadeAnimation,
  headingPostitAnimation,
} from '../../constants/keyframets';
import { useFlag } from '../../hooks/useFlag';
import usePraise from '../../hooks/usePraise';
import { useScreenVisibility } from '../../hooks/useScreenVisibility';
import Button from '../Button';
import Postit from '../Postit';
import Praise from '../Praise';
import TitlePostit from '../TitlePostit';

const ShareModal = dynamic(() => import('../ShareModal'));

const Container = styled.section`
  position: relative;
  min-height: calc(100vh - 48px);
  overflow: hidden;
`;

const ContentContainer = styled.div`
  margin-top: 210px;
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
      <Container ref={ref}>
        {visible && <TitlePostit title="TinyKitten" subtitle="をシェア" />}
        <ContentContainer>
          {visible && <StyledPostit>シェアしよう！</StyledPostit>}
          {visible && (
            <LinksContainer>
              <a
                href="https://twitter.com/intent/tweet?url=https://tinykitten.me&text=TinyKittenのポートフォリオ&via=tinykitten8&related=tinykitten8"
                target="_blank"
                rel="noreferrer noopener"
              >
                <ShareButton color="#15202B">Xでシェア</ShareButton>
              </a>
              <a
                href="https://social-plugins.line.me/lineit/share?url=https://tinykitten.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ShareButton color="#00b900">LINEで送る</ShareButton>
              </a>
              <StyledPraise
                visible={visible}
                count={count}
                onIncrement={handleIncrement}
              />
            </LinksContainer>
          )}
        </ContentContainer>
      </Container>
      <ShareModal isOpen={isModalShow} onRequestClose={hideModal} />
    </>
  );
};

export default ShareScreen;
