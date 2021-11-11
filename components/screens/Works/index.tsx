import { useRef, useState } from 'react';
import styled from 'styled-components';
import { titlePostitAnimation } from '../../../constants/keyframets';
import ScreenVisibleProvider from '../../../providers/ScreenVisibleProvider';
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
  const [visible, setVisible] = useState(false);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <Container ref={ref}>
        {visible && (
          <StyledTitlePostit title="TinyKitten" subtitle="が作ったよ" />
        )}
        <WorksContainer>
          <WorksTrainLCD />
          <WorksNearStation />
        </WorksContainer>
      </Container>
    </ScreenVisibleProvider>
  );
};

export default WorksScreen;
