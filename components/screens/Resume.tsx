import React, { useRef } from 'react';
import styled from 'styled-components';
import resumeFixutre from '../../fixtures/sections/resume/stories.json';
import useScreenVisibility from '../../hooks/useScreenVisibility';
import TitlePostit from '../TitlePostit';
import Tree from '../Tree';

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

const ResumeScreen: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useScreenVisibility(ref);

  return (
    <Container ref={ref}>
      {visible && <TitlePostit title="TinyKitten" subtitle="の職歴" />}
      <ContentContainer>
        <Tree experienceType="resume" items={resumeFixutre} visible={visible} />
      </ContentContainer>
    </Container>
  );
};

export default ResumeScreen;
