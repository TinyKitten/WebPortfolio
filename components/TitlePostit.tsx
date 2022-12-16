import styled from 'styled-components';
import { titlePostitAnimation } from '../constants/keyframets';
import VerticalPostitIcon from './VerticalPostitIcon';

type Props = {
  title: string;
  subtitle: string;
  className?: string;
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 32px;
  filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.16));
  transform: 'translateY(-147px)';
  animation: ${titlePostitAnimation} 1s ease forwards;
`;

const VerticalPostit = styled(VerticalPostitIcon)`
  position: relative;
`;

const TitleTextContainer = styled.div`
  position: absolute;
  left: auto;
  right: auto;
  top: auto;
  bottom: calc(50% - 10.5px);
  width: 100%;
  text-align: center;
`;

const TitleText = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  font-size: 1rem;
  white-space: pre-wrap;

  @media (min-width: 800px) {
    font-size: 1.25rem;
  }
`;

const SubtitleText = styled.p`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  font-size: 0.75rem;
  line-height: 1.5;

  @media (min-width: 800px) {
    font-size: 1rem;
  }
`;

const TitlePostit: React.FC<Props> = ({
  className,
  title,
  subtitle,
}: Props) => {
  return (
    <Container className={className}>
      <VerticalPostit />
      <TitleTextContainer>
        <TitleText>{title}</TitleText>
        <SubtitleText>{subtitle}</SubtitleText>
      </TitleTextContainer>
    </Container>
  );
};

export default TitlePostit;
