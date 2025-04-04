import styled from 'styled-components';
import Tag from './Tag';
import { TriviaItemObject } from '../models/trivia';
import Markdown from 'react-markdown';

type Props = {
  visible: boolean;
  item: TriviaItemObject;
};

type TriviaItemProps = {
  item: TriviaItemObject;
};

const Root = styled.div`
  cursor: pointer;
  user-select: none;
  padding: 8px;
  max-width: 100%;
`;

const Container = styled.div`
  color: ${({ theme }) => theme.boxBg};
  position: relative;
  border-radius: 4px;
  border-top: ${({ theme }) => ` 4px solid ${theme.primary}`};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  padding: 24px;
  width: 100%;
  max-width: 440px;
  max-height: 240px;

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

const TriviaItemInner = ({ item }: TriviaItemProps) => {
  const { id, title, description, tags } = item;

  return (
    <Container>
      <IndexText>TinyKitten Trivia #{id}</IndexText>
      <TitleText>{title}</TitleText>
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

const TriviaCard: React.FC<Props> = ({ item, visible }: Props) => {
  if (!visible) {
    return null;
  }

  return (
    <Root>
      <TriviaItemInner item={item} />
    </Root>
  );
};

export default TriviaCard;
