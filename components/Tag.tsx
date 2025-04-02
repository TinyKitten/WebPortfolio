import styled from 'styled-components';

type Props = {
  text: string;
  onClick?: () => void;
  invert?: boolean;
};

const Container = styled.div<{ invert: boolean }>`
  background-color: ${({ theme, invert }) =>
    invert ? theme.primary : theme.bg};
  border: 1.5px solid
    ${({ theme, invert }) => (invert ? theme.bg : theme.primary)}BF;
  padding: 8px 16px;
  border-radius: 32px;
  display: flex;
`;

const TagText = styled.span<{ invert: boolean }>`
  color: ${({ theme, invert }) => (invert ? 'white' : theme.primary)};
`;

const Tag: React.FC<Props> = ({ text, onClick, invert = false }: Props) => {
  return (
    <Container onClick={onClick} invert={invert}>
      <TagText invert={invert}>#{text}</TagText>
    </Container>
  );
};

export default Tag;
