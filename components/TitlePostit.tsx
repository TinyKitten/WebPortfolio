import {
  Container,
  SubtitleText,
  TitleText,
  TitleTextContainer,
  VerticalPostit,
} from './TitlePostit.styled';

type Props = {
  title: string;
  subtitle: string;
  className?: string;
};

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
