import styled from 'styled-components';

type Props = {
  text: string;
  onClick?: () => void;
  count?: number;
};

const Container = styled.div`
  border: 1.5px solid ${({ theme }) => theme.primary}BF;
  border-radius: 32px;
  display: flex;
  overflow: hidden;
  width: 150px;
`;

const CounterSegment = styled.div<{ rightSegment: boolean }>`
  background-color: ${({ rightSegment, theme }) =>
    rightSegment ? theme.bg : theme.primary};
  padding: 8px 0;
  width: ${({ rightSegment }) => (rightSegment ? 50 : 100)}px;
  cursor: ${({ rightSegment }) => (rightSegment ? 'default' : 'pointer')};
  user-select: ${({ rightSegment }) => (rightSegment ? 'auto' : 'none')};
`;

const Text = styled.span<{ rightSegment: boolean }>`
  color: ${({ theme, rightSegment }) =>
    rightSegment ? theme.headingText : 'white'};
`;

const Counter: React.FC<Props> = ({ text, onClick, count }: Props) => {
  return (
    <Container>
      <CounterSegment rightSegment={false} onClick={onClick}>
        <Text rightSegment={false}>{text}</Text>
      </CounterSegment>
      <CounterSegment rightSegment>
        <Text rightSegment>{count}</Text>
      </CounterSegment>
    </Container>
  );
};

export default Counter;
