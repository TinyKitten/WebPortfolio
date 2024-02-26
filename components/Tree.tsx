import dynamic from 'next/dynamic';
import { useCallback, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import { ResumeItemObject, WorksStoryItemObject } from '../models/tree';
import { DynamicLoading } from './DynamicLoading';

type Props = {
  experienceType: 'resume' | 'worksStory';
  items: unknown[];
  visible: boolean;
  showLGTM?: boolean;
  worksName?: string;
};

const TreeRoot = styled.div<{ visible: boolean }>`
  position: relative;
`;

const TreeBar = styled(animated.div)`
  position: absolute;
  width: 4px;
  background-color: ${({ theme }) => theme.primary};
  margin-left: 6px;
  z-index: 2;
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
  margin-left: 0px;
  font-size: 1.25rem;
  z-index: 3;
`;

const PresentItemContainer = styled.div`
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
  margin-left: 0;
  font-size: 1.25rem;
  z-index: 3;
`;

const TreeItem = dynamic(() => import('./TreeItem'), {
  loading: DynamicLoading,
});

const Tree = ({ experienceType, items, visible, worksName }: Props) => {
  const [animateStyles, animate] = useSpring(() => ({
    height: '0%',
    config: { duration: items.length * 200 },
  }));

  useEffect(() => {
    if (visible) {
      animate.start({ height: 'calc(100% - 12px)' }); // - 12px: 角丸の裏にバーが表示されないようにしている
    } else {
      animate.stop();
      animate.set({ height: '0%' });
    }
  }, [animate, visible]);

  const renderResumeItem = useCallback(
    (item: unknown, index: number) => {
      switch (experienceType) {
        case 'resume': {
          const resumeItem = item as ResumeItemObject;
          return (
            <TreeItem
              key={resumeItem.companyName}
              item={resumeItem}
              experienceType={experienceType}
              index={index}
              visible={visible}
              showLGTM={false}
            />
          );
        }
        case 'worksStory': {
          const storyItem = item as WorksStoryItemObject;
          return (
            <TreeItem
              key={storyItem.id}
              item={storyItem}
              experienceType={experienceType}
              index={index}
              visible={visible}
              showLGTM
              worksName={worksName}
            />
          );
        }
        default:
          return <></>;
      }
    },
    [experienceType, visible, worksName]
  );

  return (
    <TreeRoot visible={visible}>
      <TreeBar style={animateStyles} />
      <StartItemContainer>
        <p>START</p>
      </StartItemContainer>
      {items.map(renderResumeItem)}
      <PresentItemContainer>
        <p>PRESENT</p>
      </PresentItemContainer>
    </TreeRoot>
  );
};

export default Tree;
