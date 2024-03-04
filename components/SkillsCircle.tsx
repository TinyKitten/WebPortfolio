import {
  Container,
  IconContainer,
  SkillImageWrapper,
  SkillName,
} from './SkillsCircle.styled';

type Props = {
  name: string;
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
};

const SkillsCircle: React.FC<Props> = ({ name, icon: Icon }: Props) => {
  return (
    <Container>
      <SkillImageWrapper>
        <IconContainer>
          <Icon />
        </IconContainer>
      </SkillImageWrapper>
      <SkillName>{name}</SkillName>
    </Container>
  );
};

export default SkillsCircle;
