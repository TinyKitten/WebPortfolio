import { useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { ResumeItemObject, WorksStoryItemObject } from '../models/tree';

type Props = {
  experienceType: 'resume' | 'worksStory';
  item: ResumeItemObject | WorksStoryItemObject;
  index: number;
  visible: boolean;
};

type TreeResumeItemProps = {
  period: string;
  title: string;
  description: string;
};

export const containerSlideAnimation = keyframes({
  from: {
    transform: 'translateX(-480px)',
  },
  to: {
    transform: 'translateX(0)',
  },
});

const Root = styled.div`
  overflow: hidden;
  margin-left: -4px;
`;

const Container = styled.div<{ delay: number }>`
  animation: ${containerSlideAnimation} 1s ease-out forwards;
  animation-delay: ${({ delay }) => `${delay}ms`};
  color: ${({ theme }) => theme.boxBg};
  margin-bottom: 32px;
  position: relative;
  margin-left: 32px;
  border-radius: 4px;
  border-top: ${({ theme }) => ` 4px solid ${theme.primary}`};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  padding: 24px;
  width: 480px;
  max-width: 60vw;
  transform: translateX(-480px);
  &:before {
    content: '';
    background-color: ${({ theme }) => theme.primary};
    width: 32px;
    height: 4px;
    position: absolute;
    top: 16px;
    left: -32px;
  }
`;

const PeriodText = styled.time`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`;

const TitleText = styled.h3`
  font-weight: bold;
  margin-top: 16px;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.25;
`;

const DescriptionText = styled.p`
  margin-top: 16px;
  color: ${({ theme }) => theme.headingText};
  line-height: 1.75;
  white-space: pre-wrap;
`;

const TreeItemInner: React.FC<TreeResumeItemProps> = ({
  period,
  title,
  description,
}: TreeResumeItemProps) => {
  return (
    <>
      <PeriodText>{period}</PeriodText>
      <TitleText>{title}</TitleText>
      <DescriptionText>{description}</DescriptionText>
    </>
  );
};

const TreeItem: React.FC<Props> = ({
  experienceType,
  item,
  index,
  visible,
}: Props) => {
  const experienceInfo = useMemo((): {
    period: string;
    title: string;
    description: string;
  } => {
    switch (experienceType) {
      case 'resume': {
        const resume = item as ResumeItemObject;
        const baseExperienceObject = {
          title: resume.companyName,
          description: resume.description,
        };
        if (resume.startAtFullYear === resume.endAtFullYear) {
          return {
            ...baseExperienceObject,
            period: `${resume.startAtFullYear}`,
          };
        }
        if (!resume.endAtFullYear) {
          return {
            ...baseExperienceObject,
            period: `${resume.startAtFullYear}-`,
          };
        }

        return {
          ...baseExperienceObject,
          period: `${resume.startAtFullYear}-${resume.endAtFullYear}`,
        };
      }
      case 'worksStory': {
        const story = item as WorksStoryItemObject;
        const baseExperienceObject = {
          title: story.title,
          description: story.description,
        };

        if (story.startAt === story.finishedAt) {
          return {
            ...baseExperienceObject,
            period: `${story.startAt}`,
          };
        }
        if (!story.finishedAt) {
          return {
            ...baseExperienceObject,
            period: `${story.startAt}-`,
          };
        }
      }
    }
  }, [experienceType, item]);

  if (!visible) {
    return null;
  }

  const { period, title, description } = experienceInfo;

  return (
    <Root>
      <Container delay={index * 150}>
        <TreeItemInner
          period={period}
          title={title}
          description={description}
        />
      </Container>
    </Root>
  );
};

export default TreeItem;
