import Link from 'next/link';
import styled from 'styled-components';
import Button from '../components/Button';
import Postit from '../components/Postit';
import { headingPostitAnimation } from '../constants/keyframets';

const Container = styled.div`
  height: calc(100vh - 48px);
  padding-top: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
`;

const StyledPostit = styled(Postit)`
  position: relative;
  animation: ${headingPostitAnimation} 1s ease forwards;
`;

const Message = styled.p`
  margin-top: 48px;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  margin-bottom: 24px;
`;

const NoMatchPage: React.FC = () => (
  <Container>
    <StyledPostit>Not Found</StyledPostit>
    <Message>お探しのページは見つかりませんでした。</Message>
    <Link href="/" passHref>
      <div>
        <Button>トップ</Button>
      </div>
    </Link>
  </Container>
);

export default NoMatchPage;
