import styled from 'styled-components';
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
`;

const VerticalPostit = styled(VerticalPostitIcon)`
  position: relative;
  filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.16));
`;

const TitleTextContainer = styled.div`
  position: absolute;
  left: auto;
  right: auto;
  top: auto;
  bottom: calc(50% - 10.5px);
  width: 100%;
  text-align: center;
  line-height: 1.2;
`;

const TitleText = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  font-size: 1.25rem;
`;

const SubtitleText = styled.p`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  font-size: 1rem;
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
