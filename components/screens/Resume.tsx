import React, { useRef, useState } from 'react';
import TitlePostit from '../TitlePostit';
import ScreenVisibleProvider from '../../providers/ScreenVisibleProvider';
import resumeFixutre from '../../fixtures/resume.json';
import ResumeItem from '../ResumeItem';
import styled from 'styled-components';

const Container = styled.section`
  position: relative;
  min-height: calc(100vh - 48px);
  overflow: hidden;
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

const ContentContainer = styled.div`
  padding-top: 210px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 64px;
`;

const Tree = styled.div`
  border-left: 4px solid #008ffe;
`;

const StartItemContainer = styled.div`
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
`;

const EndItemContainer = styled.div`
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
`;

const ResumeScreen: React.FC = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  return (
    <ScreenVisibleProvider contentRef={ref} onVisibleChange={setVisible}>
      <Container ref={ref}>
        {visible && <StyledTitlePostit title="TinyKitten" subtitle="の職歴" />}
        <ContentContainer>
          <Tree>
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
