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
  min-width: ${({ rightSegment }) => (rightSegment ? 50 : 100)}px;
`;

const Text = styled.span<{ rightSegment: boolean }>`
  color: ${({ theme, rightSegment }) =>
    rightSegment ? theme.headingText : 'white'};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Counter: React.FC<Props> = ({ text, onClick, count }: Props) => {
  return (
    <Container onClick={onClick}>
      <CounterSegment rightSegment={false}>
        <Text rightSegment={false}>{text}</Text>
      </CounterSegment>
      <CounterSegment rightSegment>
        <Text rightSegment>{count}</Text>
      </CounterSegment>
    </Container>
  );
};

export default Counter;
