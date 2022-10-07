import { useRef } from 'react';
import styled from 'styled-components';
import { titlePostitAnimation } from '../../../constants/keyframets';
import useScreenVisibility from '../../../hooks/useScreenVisibility';
import TitlePostit from '../../TitlePostit';
import WorksNearStation from './NearStation';
import WorksTrainLCD from './TrainLCD';

const Container = styled.section`
  overflow: hidden;
  position: relative;
  min-height: calc(100vh - 48px);
`;

const WorksContainer = styled.div`
  margin-top: 144px;
  @media (min-width: 800px) {
    margin-top: 0px;
  }
`;

const StyledTitlePostit = styled(TitlePostit)`
  animation: ${titlePostitAnimation} 1s ease forwards;
`;

const WorksScreen: React.FC = () => {
  const ref = useRef(null);
  const visible = useScreenVisibility(ref);

  return (
    <Container ref={ref}>
      {visible && (
        <StyledTitlePostit title="TinyKitten" subtitle="が作ったよ" />
      )}
      <WorksContainer>
        <WorksTrainLCD />
        <WorksNearStation />
      </WorksContainer>
    </Container>
  );
};

export default WorksScreen;
