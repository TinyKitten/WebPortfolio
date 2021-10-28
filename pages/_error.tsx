import type { ErrorProps } from 'next/error';
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

const ErrorPage: React.FC<ErrorProps> = ({ statusCode }: ErrorProps) => (
  <Container>
    <StyledPostit>
      {statusCode === 404 ? 'Not Found' : 'Internal Server Error'}
    </StyledPostit>
    <Message>
      {statusCode === 404
        ? 'お探しのページは見つかりませんでした。'
        : '内部サーバーエラーが発生しました。しばらくしてからもう一度アクセスしてください。'}
    </Message>
    <Link href="/" passHref>
      <div>
        <Button>トップ</Button>
      </div>
    </Link>
  </Container>
);

export default ErrorPage;
