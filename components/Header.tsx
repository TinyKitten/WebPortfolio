import Link from 'next/link';
import TinyKittenIcon from './TinyKittenIcon';
import { forwardRef } from 'react';
import styled from 'styled-components';

const ForwardedIcon = forwardRef(() => (
  <TinyKittenIcon width={32} height={32} />
));

ForwardedIcon.displayName = 'TinyKittenIcon';

const Root = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  height: 48px;
  background: ${({ theme }) => theme.bg};
  z-index: 9999;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
`;

const Title = styled.div`
  text-decoration: none;
`;

const Header: React.FC = () => {
  return (
    <Root>
      <Title>
        <Link href="/" passHref>
          <div>
            <ForwardedIcon />
          </div>
        </Link>
      </Title>
    </Root>
  );
};

export default Header;
