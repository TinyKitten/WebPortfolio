import { useRef } from 'react';
import styled from 'styled-components';
import useScreenVisibility from '../../../hooks/useScreenVisibility';
import TitlePostit from '../../TitlePostit';
import WorksNearStation from './NearStation';
import WorksTrainLCD from './TrainLCD';

const Container = styled.section`
  overflow: hidden;
  position: relative;
  min-height: 100vh;
`;

const WorksContainer = styled.div`
  margin-top: 144px;
  @media (min-width: 800px) {
    margin-top: 0px;
  }
`;

const WorksScreen: React.FC = () => {
  const ref = useRef(null);
  const visible = useScreenVisibility(ref);

  return (
    <Container ref={ref}>
      {visible && <TitlePostit title="TinyKitten" subtitle="が作ったよ" />}
      <WorksContainer>
        <WorksTrainLCD />
        <WorksNearStation />
      </WorksContainer>
    </Container>
  );
};

export default WorksScreen;
