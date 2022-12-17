import styled from 'styled-components';
import { skillCircleAnimation } from '../constants/keyframets';

type Props = {
  name: string;
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SkillImageWrapper = styled.div`
  overflow: hidden;
  background: ${({ theme }) => theme.boxBg};
  width: 120px;
  height: 120px;
  border-radius: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 18px;
  animation: ${skillCircleAnimation} 1s ease forwards;
`;

const SkillName = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const IconContainer = styled.div`
  > svg {
    width: auto;
    height: 64px;
  }
`;

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
