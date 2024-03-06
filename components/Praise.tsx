import { useCallback } from 'react';
import styled from 'styled-components';
import { useFlag } from '../hooks/useFlag';

type Props = {
  onIncrement: () => void;
  count: string;
  className?: string;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: column;
  @media (min-width: 800px) {
    flex-direction: row;
  }
`;

const Button = styled.button`
  appearance: none;
  -webkit-appearance: none;
  border: none;
  color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  min-width: 210px;
  height: 48px;
  font-size: 1.2rem;
  border-radius: 1px;
  cursor: pointer;
  transition: 0.25s;
  background: ${({ theme }) => theme.primary};

  &:focus {
    outline: none;
  }
  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
  }
`;

const Balloon = styled.div`
  display: inline-block;
  position: relative;
  background: ${({ theme }) => theme.boxBg};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  padding: 14px 0;
  font-size: 1.2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  border-radius: 8px;
  color: ${({ theme }) => theme.text};
  margin-top: 14px;
  text-align: center;
  width: 210px;
  @media (min-width: 800px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 220px;
    margin-top: 0;
    width: auto;
    height: 48px;
    padding: 0 14px;
  }
`;

const Praise: React.FC<Props> = ({ onIncrement, count, className }: Props) => {
  const {
    value: clicked,
    toTrue: toClicked,
    toFalse: toNotClicked,
  } = useFlag();

  const handleClick = useCallback(() => {
    onIncrement();
    toClicked();
    setTimeout(() => {
      toNotClicked();
    }, 1500);
  }, [onIncrement, toClicked, toNotClicked]);

  return (
    <Container className={className}>
      <Button onClick={handleClick}>
        {clicked ? 'ありがとう！' : 'ほめる'}
      </Button>
      <Balloon>{count}</Balloon>
    </Container>
  );
};

export default Praise;
