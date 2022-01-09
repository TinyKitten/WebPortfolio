import { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { titlePostitAnimation } from '../../constants/keyframets';
import ScreenVisibleProvider from '../../providers/ScreenVisibleProvider';
import FigmaIcon from '../marks/FigmaIcon';
import JSIcon from '../marks/JSIcon';
import ReactIcon from '../marks/ReactIcon';
import TSIcon from '../marks/TSIcon';
import SkillsCircle from '../SkillsCircle';
import TitlePostit from '../TitlePostit';

const Container = styled.section`
  position: relative;
  min-height: calc(100vh - 48px);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTitlePostit = styled(TitlePostit)`
  animation: ${titlePostitAnimation} 1s ease forwards;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const tipsPostitAnimation = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-32px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const SkillsContainer = styled.div`
  width: 75%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 32px;
  animation: ${tipsPostitAnimation} 1s ease forwards;
  margin-top: calc(144px + 32px);
  margin-bottom: 32px;
  @media (min-width: 800px) {
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;

const SkillsScreen: React.FC = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <Container ref={ref}>
        {visible && (
          <StyledTitlePostit title="TinyKitten" subtitle="のスキル" />
        )}
        <ContentContainer>
          {visible && (
            <SkillsContainer>
              <SkillsCircle icon={JSIcon} name="JavaScript" />
              <SkillsCircle icon={TSIcon} name="TypeScript" />
              <SkillsCircle icon={ReactIcon} name="React (Native)" />
              <SkillsCircle icon={FigmaIcon} name="Figma" />
            </SkillsContainer>
          )}
        </ContentContainer>
      </Container>
    </ScreenVisibleProvider>
  );
};

export default SkillsScreen;
