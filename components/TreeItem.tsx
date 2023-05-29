import { useCallback, useMemo, useState } from 'react';
import reactStringReplace from 'react-string-replace';
import styled, { keyframes } from 'styled-components';
import useLGTM from '../hooks/useLGTM';
import { ResumeItemObject, WorksStoryItemObject } from '../models/tree';
import Counter from './Counter';
import Tag from './Tag';

type Props = {
  experienceType: 'resume' | 'worksStory';
  item: ResumeItemObject | WorksStoryItemObject;
  index: number;
  visible: boolean;
  showLGTM: boolean;
  worksName?: string;
};

type TreeResumeItemProps = {
  period: string;
  title: string;
  description: string;
  tags: string[];
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
  padding-right: 4px;
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

const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;
`;

const DescriptionLink = styled.a`
  color: ${({ theme }) => theme.primary};
  word-wrap: break-word;
`;

const LGTMContainer = styled.div`
  width: 120px;
  margin-top: 24px;
  cursor: pointer;
  text-align: center;
  user-select: none;
`;

const TreeItemInner: React.FC<TreeResumeItemProps> = ({
  period,
  title,
  description,
  tags,
}: TreeResumeItemProps) => {
  const descriptionParagraph = useMemo(
    () => (
      <DescriptionText>
        {reactStringReplace(description, /(https?:\/\/\S+)/g, (match, i) => (
          <DescriptionLink
            key={i}
            href={match}
            target="_blank"
            rel="noreferrer"
          >
            {match}
          </DescriptionLink>
        ))}
      </DescriptionText>
    ),
    [description]
  );

  return (
    <>
      <PeriodText>{period}</PeriodText>
      <TitleText>{title}</TitleText>
      {descriptionParagraph}
      {tags.length > 0 && (
        <TagsContainer>
          {tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </TagsContainer>
      )}
    </>
  );
};

const TreeItem: React.FC<Props> = ({
  experienceType,
  item,
  index,
  visible,
  showLGTM = false,
  worksName = '',
}: Props) => {
  const [lgtmClicked, setLGTMClicked] = useState(false);

  const { count: lgtmCount, incrementCount: incrementLGTMCount } = useLGTM(
    worksName,
    index
  );

  const handleLGTM = useCallback(() => {
    incrementLGTMCount();
    setLGTMClicked(true);
    setTimeout(() => {
      setLGTMClicked(false);
    }, 1500);
  }, [incrementLGTMCount]);

  const lgtmText = useMemo(
    () => (lgtmClicked ? `わーい！` : `えらいね `),
    [lgtmClicked]
  );

  const experienceInfo = useMemo((): {
    period: string;
    title: string;
    description: string;
    tags: string[];
  } => {
    switch (experienceType) {
      case 'resume': {
        const resume = item as ResumeItemObject;
        const baseExperienceObject = {
          title: resume.companyName,
          description: resume.description,
          tags: [],
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
          tags: story.tags,
        };

        if (story.startAt === story.finishedAt || !story.finishedAt) {
          return {
            ...baseExperienceObject,
            period: `${story.startAt}`,
          };
        }
      }
    }
  }, [experienceType, item]);

  if (!visible) {
    return null;
  }

  const { period, title, description, tags } = experienceInfo;

  return (
    <Root>
      <Container delay={index * 150}>
        <TreeItemInner
          period={period}
          title={title}
          description={description}
          tags={tags}
        />
        {showLGTM && (
          <LGTMContainer>
            <Counter text={lgtmText} onClick={handleLGTM} count={lgtmCount} />
          </LGTMContainer>
        )}
      </Container>
    </Root>
  );
};

export default TreeItem;
