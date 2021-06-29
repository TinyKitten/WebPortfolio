import { useCallback, useState } from 'react';
import styled from 'styled-components';

type Props = {
  onIncrement: () => void;
  count: number;
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
  background: #008ffe;

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
  background: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  padding: 14px 0;
  font-size: 1.2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  border-radius: 8px;
  color: #707070;
  margin-top: 14px;
  text-align: center;
  width: 210px;
  @media (min-width: 800px) {
    position: absolute;
    left: 220px;
    margin-top: 0;
    width: auto;
    padding: 14px;
  }
`;

const Praise: React.FC<Props> = ({ onIncrement, count, className }: Props) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = useCallback(() => {
    onIncrement();
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 1500);
  }, [onIncrement]);

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
