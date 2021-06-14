import styled from 'styled-components';
import PostitIcon from './PostitIcon';

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Container = styled.div`
  display: inline-block;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.text};
  display: block;
  position: absolute;
  width: 189px;
  margin-left: 21px;
  left: 0;
  top: 0;
  text-align: center;
  line-height: 48px;
  font-size: 1.2rem;
`;

const BG = styled(PostitIcon)`
  filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.16));
`;

const Postit: React.FC<Props> = ({ className, children }: Props) => (
  <Container className={className}>
    <BG width={210} height={48} />
    <Text>{children}</Text>
  </Container>
);

export default Postit;
