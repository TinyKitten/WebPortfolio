import React, { useEffect, useRef } from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import resumeFixutre from '../../fixtures/resume.json';
import useScreenVisibility from '../../hooks/useScreenVisibility';
import ResumeItem from '../ResumeItem';
import TitlePostit from '../TitlePostit';

const Container = styled.section`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
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
  const visible = useScreenVisibility(ref);

  const [animateStyles, animate] = useSpring(() => ({
    height: '0%',
    config: { duration: resumeFixutre.length * 200 },
  }));

  useEffect(() => {
    if (visible) {
      animate.start({ height: `100%` });
    } else {
      animate.stop();
      animate.set({ height: '0%' });
    }
  }, [animate, visible]);
  return (
    <Container ref={ref}>
      {visible && <TitlePostit title="TinyKitten" subtitle="の職歴" />}
      <ContentContainer>
        <Tree visible={visible}>
          <TreeBar style={animateStyles} />
          <StartItemContainer>
            <p>START</p>
          </StartItemContainer>
          {resumeFixutre.map((r, i) => (
            <ResumeItem
              key={r.companyName}
              resume={r}
              index={i}
              visible={visible}
            />
          ))}
          <EndItemContainer>
            <p>PRESENT</p>
          </EndItemContainer>
        </Tree>
      </ContentContainer>
    </Container>
  );
};

export default ResumeScreen;
