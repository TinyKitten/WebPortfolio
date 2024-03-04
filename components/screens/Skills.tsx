'use client';
import { useScreenVisibility } from '../../hooks/useScreenVisibility';
import SkillsCircle from '../SkillsCircle';
import TitlePostit from '../TitlePostit';
import JSIcon from '../marks/JSIcon';
import ReactIcon from '../marks/ReactIcon';
import TSIcon from '../marks/TSIcon';
import { Container, ContentContainer, SkillsContainer } from './Skills.styled';

const SkillsScreen: React.FC = () => {
  const { visible, ref } = useScreenVisibility();

  return (
    <Container ref={ref}>
      {visible && <TitlePostit title="TinyKitten" subtitle="のスキル" />}
      <ContentContainer>
        {visible && (
          <SkillsContainer>
            <SkillsCircle icon={JSIcon} name="JavaScript" />
            <SkillsCircle icon={TSIcon} name="TypeScript" />
            <SkillsCircle icon={ReactIcon} name="React (Native)" />
          </SkillsContainer>
        )}
      </ContentContainer>
    </Container>
  );
};

export default SkillsScreen;
