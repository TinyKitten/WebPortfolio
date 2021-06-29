import styled from 'styled-components';

type Props = {
  color?: string;
  children: React.ReactNode;
  className?: string;
};

const ButtonBase = styled.button`
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
  &:focus {
    outline: none;
  }
  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
  }
`;

const Button: React.FC<Props> = ({
  color = '#008ffe',
  children,
  className,
}: Props) => (
  <ButtonBase style={{ backgroundColor: color }} className={className}>
    {children}
  </ButtonBase>
);

export default Button;
