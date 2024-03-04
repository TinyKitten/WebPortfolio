import { ArrowButton } from '../ArrowButton';
import {
  Container,
  Logo,
  LogoWrapper,
  MyName,
  StyledPostit,
} from './Welcome.styled';

const WelcomeScreen = () => {
  return (
    <Container>
      <LogoWrapper>
        <StyledPostit>Frontend Engineer</StyledPostit>
        <Logo width={120} height={120} />
      </LogoWrapper>
      <MyName>TinyKitten</MyName>
      <ArrowButton />
    </Container>
  );
};

export default WelcomeScreen;
