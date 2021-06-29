import { useRef, useState } from 'react';
import usePraise from '../../hooks/usePraise';
import ScreenVisibleProvider from '../../providers/ScreenVisibleProvider';
import Button from '../Button';
import Postit from '../Postit';
import TitlePostit from '../TitlePostit';
import Praise from '../Praise';
import styled from 'styled-components';

/*
.container {
}
.content {
}
.logoWrapper {
  position: relative;
}
.logo {
  width: 120px;
  height: 120px;
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.16));
}
.name {
  margin-top: 32px;
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  color: #707070;
}
.postit {
}
.links {
}
.shareButton {
}
.titlePostit {
}
*/

const Container = styled.section`
  position: relative;
  min-height: calc(100vh - 48px);
  overflow: hidden;
`;

const StyledTitlePostit = styled(TitlePostit)`
  animation: titlePostitAnimation 1s ease forwards;

  @keyframes titlePostitAnimation {
    from {
      transform: translateY(-147px);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const ContentContainer = styled.div`
  padding-top: 210px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledPostit = styled(Postit)`
  animation: headingPostitAnimation 1s ease forwards;

  @keyframes headingPostitAnimation {
    from {
      opacity: 0;
      transform: translateY(-64px);
    }
    to {
      opacity: 1;
      transform: translateY(0) rotate(-5deg);
    }
  }
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 32px;
  opacity: 0;
  animation: shareButtonAnimation 1s ease 0.25s forwards;

  @keyframes shareButtonAnimation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ShareButton = styled(Button)`
  margin: 12px 0;
`;

const StyledPraise = styled(Praise)`
  margin: 12px 0;
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
        </ContentContainer>
      </Container>
    </ScreenVisibleProvider>
  );
};

export default ShareScreen;
