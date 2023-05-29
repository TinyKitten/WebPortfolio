import styled from 'styled-components';

type Props = {
  text: string;
  onClick?: () => void;
  showHash?: boolean;
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  border: 1.5px solid ${({ theme }) => theme.primary}BF;
  padding: 8px 16px;
  border-radius: 32px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
`;

const TagText = styled.span`
  color: ${({ theme }) => theme.headingText};
`;

const Tag: React.FC<Props> = ({ text, onClick, showHash = true }: Props) => {
  return (
    <Container onClick={onClick}>
      <TagText>
        {showHash && '#'}
        {text}
      </TagText>
    </Container>
  );
};

export default Tag;
