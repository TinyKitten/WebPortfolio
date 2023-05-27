import styled from 'styled-components';

type Props = { text: string };

const Container = styled.div`
  background-color: ${({ theme }) => theme.boxBg};
  border: 1.5px solid ${({ theme }) => theme.primary}BF;
  padding: 8px 16px;
  border-radius: 32px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
`;

const TagText = styled.span`
  color: ${({ theme }) => theme.headingText};
`;

const Tag: React.FC<Props> = ({ text }: Props) => {
  return (
    <Container>
      <TagText>#{text}</TagText>
    </Container>
  );
};

export default Tag;
