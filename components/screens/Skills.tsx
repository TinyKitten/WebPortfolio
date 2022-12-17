import { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import useScreenVisibility from '../../hooks/useScreenVisibility';
import JSIcon from '../marks/JSIcon';
import ReactIcon from '../marks/ReactIcon';
import TSIcon from '../marks/TSIcon';
import SkillsCircle from '../SkillsCircle';
import TitlePostit from '../TitlePostit';

const Container = styled.section`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
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
  const visible = useScreenVisibility(ref);

  return (
    <Container ref={ref}>
      {visible && <TitlePostit title="TinyKitten" subtitle="のスキル" />}
      <ContentContainer>
        {visible && (
          <SkillsContainer>
            <SkillsCircle
              icon={JSIcon}
              experiencedYears={5}
              description="foo!"
              name="JavaScript"
            />
            <SkillsCircle
              icon={TSIcon}
              experiencedYears={5}
              description="foo!"
              name="TypeScript"
            />
            <SkillsCircle
              icon={ReactIcon}
              experiencedYears={2}
              description="foo1"
              name="React (Native)"
            />
          </SkillsContainer>
        )}
      </ContentContainer>
    </Container>
  );
};

export default SkillsScreen;
