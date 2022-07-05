import React, { useEffect, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import { titlePostitAnimation } from '../../constants/keyframets';
import resumeFixutre from '../../fixtures/resume.json';
import ScreenVisibleProvider from '../../providers/ScreenVisibleProvider';
import ResumeItem from '../ResumeItem';
import TitlePostit from '../TitlePostit';

const Container = styled.section`
  position: relative;
  min-height: calc(100vh - 48px);
  overflow: hidden;
`;

const StyledTitlePostit = styled(TitlePostit)`
  animation: ${titlePostitAnimation} 1s ease forwards;
`;

const ContentContainer = styled.div`
  padding-top: 210px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 64px;
  position: relative;
`;

const Tree = styled.div<{ visible: boolean }>`
  position: relative;
`;

const TreeBar = styled(animated.div)`
  position: absolute;
  width: 4px;
  background-color: ${({ theme }) => theme.primary};
  left: -6px;
`;

const StartItemContainer = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.boxBg};
  width: 128px;
  padding: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  font-weight: bold;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  margin-left: -8px;
  margin-bottom: 32px;
  margin-top: -32px;
  margin-left: -32px;
  font-size: 1.25rem;
  z-index: 1;
`;

const EndItemContainer = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.boxBg};
  width: 128px;
  padding: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  font-weight: bold;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
  margin-left: -8px;
  margin-top: 32px;
  margin-left: -32px;
  font-size: 1.25rem;
  z-index: 1;
`;

const ResumeScreen: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const [treeLeftBarStyles, treeLeftBarlStylesApi] = useSpring(() => ({
    height: '0%',
    config: { duration: 1500 },
  }));

  useEffect(() => {
    if (visible) {
      treeLeftBarlStylesApi({ height: `100%` });
    } else {
      treeLeftBarlStylesApi.stop();
      treeLeftBarlStylesApi.set({ height: '0%' });
    }
  }, [treeLeftBarlStylesApi, visible]);
  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <Container ref={ref}>
        {visible && <StyledTitlePostit title="TinyKitten" subtitle="の職歴" />}
        <ContentContainer>
          <Tree visible={visible}>
            <TreeBar style={treeLeftBarStyles} />
            <StartItemContainer>
              <p>START</p>
            </StartItemContainer>
            {resumeFixutre.map((r) => (
              <ResumeItem key={r.companyName} resume={r} />
            ))}
            <EndItemContainer>
              <p>PRESENT</p>
            </EndItemContainer>
          </Tree>
        </ContentContainer>
      </Container>
    </ScreenVisibleProvider>
  );
};

export default ResumeScreen;
