import { useRef, useState } from 'react';
import ScreenVisibleProvider from '../../../providers/ScreenVisibleProvider';
import TitlePostit from '../../TitlePostit';
import WorksTrainLCD from './TrainLCD';
import WorksNearStation from './NearStation';
import styled from 'styled-components';

const Container = styled.section`
  overflow: hidden;
  position: relative;
  min-height: calc(100vh - 48px);
`;

const StyledTitlePostit = styled(TitlePostit)`
  animation: titlePostitAnimation 1s ease forwards;

  @keyframes titlePostitAnimation {
    from {
      transform: translateY(-147px);
    }
    to {
      transform: translateY(0);
    }
  }
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
        <WorksTrainLCD />
        <WorksNearStation />
      </Container>
    </ScreenVisibleProvider>
  );
};

export default WorksScreen;
