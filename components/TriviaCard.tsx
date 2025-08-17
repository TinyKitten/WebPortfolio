import styled from 'styled-components';
import Tag from './Tag';
import { TriviaItemObject } from '../models/trivia';
import Markdown from 'react-markdown';

type Props = {
  visible: boolean;
  title: string;
  item: TriviaItemObject;
};

const Container = styled.div`
  color: ${({ theme }) => theme.boxBg};
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
  border-top: ${({ theme }) => ` 4px solid ${theme.primary}`};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  padding: 24px;
  width: 100%;
  max-width: 440px;
  margin: 8px 0;

  @media (max-width: 800px) {
    max-width: 280px;
  }
`;

const IndexText = styled.p`
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
  white-space: pre-wrap;
`;

const DescriptionContainer = styled.div`
  margin-top: 16px;
  color: ${({ theme }) => theme.headingText};
  line-height: 1.75;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;
`;

const TriviaCard: React.FC<Props> = ({ title, item, visible }: Props) => {
  if (!visible) {
    return null;
  }

  const { id, subject, description, tags } = item;

  return (
    <Container>
      <IndexText>
        {title} Trivia #{id}
      </IndexText>
      <TitleText>{subject}</TitleText>
      <DescriptionContainer>
        <Markdown>{description}</Markdown>
      </DescriptionContainer>
      {tags.length > 0 && (
        <TagsContainer>
          {tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </TagsContainer>
      )}
    </Container>
  );
};

export default TriviaCard;
