import { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  fadeAnimation,
  headingPostitAnimation,
  titlePostitAnimation,
} from '../../constants/keyframets';
import usePraise from '../../hooks/usePraise';
import ScreenVisibleProvider from '../../providers/ScreenVisibleProvider';
import Button from '../Button';
import Postit from '../Postit';
import Praise from '../Praise';
import TitlePostit from '../TitlePostit';

const Container = styled.section`
  position: relative;
  min-height: calc(100vh - 48px);
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

const CautionText = styled.p`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  margin-top: 24px;
`;

const ShareScreen: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const { count, incrementCount } = usePraise(visible);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
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
                <ShareButton color="#1DA1F2">Twitter</ShareButton>
              </a>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://tinykitten.me"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ShareButton color="#3E54A4">Facebook</ShareButton>
              </a>
              <StyledPraise count={count} onIncrement={incrementCount} />
            </LinksContainer>
          )}
          <CautionText>
            お気持ち以上の連打や自動化ツールを使用しての連打はご遠慮ください。
          </CautionText>
        </ContentContainer>
      </Container>
    </ScreenVisibleProvider>
  );
};

export default ShareScreen;
