'use client';
import { useCallback } from 'react';
import type { ResumeItemObject, WorksStoryItemObject } from '../models/tree';
import TreeItem from './TreeItem';

type Props = {
  experienceType: 'resume' | 'worksStory';
  items: unknown[];
  visible: boolean;
  showLGTM?: boolean;
  worksName?: string;
};

const Tree = ({ experienceType, items, visible, worksName }: Props) => {
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
    <div className="relative">
      <div
        className="absolute z-[2] ml-1.5 w-1 bg-primary"
        style={{
          height: visible ? 'calc(100% - 12px)' : '0%',
          transition: `height ${items.length * 200}ms ease`,
        }}
      />
      <div className="relative z-[3] -mt-8 ml-0 mb-8 w-32 rounded-lg bg-box-bg p-4 text-center text-[1.25rem] font-bold text-theme-text shadow-[0_0_4px_rgba(0,0,0,0.25)]">
        <p>START</p>
      </div>
      {items.map(renderResumeItem)}
      <div className="relative z-[3] mt-8 ml-0 w-32 rounded-lg bg-box-bg p-4 text-center text-[1.25rem] font-bold text-theme-text shadow-[0_0_4px_rgba(0,0,0,0.25)]">
        <p>PRESENT</p>
      </div>
    </div>
  );
};

export default Tree;
