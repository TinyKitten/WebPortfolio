"use client";
import { useCallback, useMemo } from "react";
import reactStringReplace from "react-string-replace";
import { useFlag } from "../hooks/useFlag";
import useLGTM from "../hooks/useLGTM";
import type { ResumeItemObject, WorksStoryItemObject } from "../models/tree";
import Counter from "./Counter";
import Tag from "./Tag";

type Props = {
  experienceType: "resume" | "worksStory";
  item: ResumeItemObject | WorksStoryItemObject;
  index: number;
  visible: boolean;
  showLGTM: boolean;
  worksName?: string;
};

type TreeResumeItemProps = {
  period: string;
  title: string;
  description: string;
  tags: string[];
};

const TreeItemInner = ({ period, title, description, tags }: TreeResumeItemProps) => {
  const descriptionParagraph = useMemo(
    () => (
      <p className="mt-4 whitespace-pre-wrap break-words leading-[1.75] text-heading-text">
        {reactStringReplace(description, /(https?:\/\/\S+)/g, (match, i) => (
          <a
            key={i}
            href={match}
            target="_blank"
            rel="noreferrer"
            className="text-primary break-all"
          >
            {match}
          </a>
        ))}
      </p>
    ),
    [description],
  );

  return (
    <>
      <time className="font-sans font-bold text-primary">{period}</time>
      <h3 className="mt-4 whitespace-pre-wrap text-[1.25rem] font-bold leading-tight text-theme-text">
        {title}
      </h3>
      {descriptionParagraph}
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
      )}
    </>
  );
};

const TreeItem = ({
  experienceType,
  item,
  index,
  visible,
  showLGTM = false,
  worksName = "",
}: Props) => {
  const { value: lgtmClicked, toTrue: setClickedForTrue, toFalse: setClickedForFalse } = useFlag();

  const { count: lgtmCount, incrementCount: incrementLGTMCount } = useLGTM(worksName, index);

  const handleLGTM = useCallback(() => {
    void incrementLGTMCount();
    setClickedForTrue();
    setTimeout(() => {
      setClickedForFalse();
    }, 1500);
  }, [incrementLGTMCount, setClickedForFalse, setClickedForTrue]);

  const lgtmText = useMemo(() => (lgtmClicked ? "わーい！" : "えらいね "), [lgtmClicked]);

  const experienceInfo = useMemo<{
    period: string;
    title: string;
    description: string;
    tags: string[];
  } | null>(() => {
    switch (experienceType) {
      case "resume": {
        const resume = item as ResumeItemObject;
        const baseExperienceObject = {
          title: resume.companyName,
          description: resume.description,
          tags: [],
        };
        if (resume.startAtFullYear === resume.endAtFullYear) {
          return { ...baseExperienceObject, period: `${resume.startAtFullYear}` };
        }
        if (!resume.endAtFullYear) {
          return { ...baseExperienceObject, period: `${resume.startAtFullYear}-` };
        }
        return {
          ...baseExperienceObject,
          period: `${resume.startAtFullYear}-${resume.endAtFullYear}`,
        };
      }
      case "worksStory": {
        const story = item as WorksStoryItemObject;
        const baseExperienceObject = {
          title: story.title,
          description: story.description,
          tags: story.tags,
        };
        if (story.startAt === story.finishedAt || !story.finishedAt) {
          return { ...baseExperienceObject, period: `${story.startAt}` };
        }
        return {
          ...baseExperienceObject,
          period: `${story.startAt} - ${story.finishedAt}`,
        };
      }
      default:
        return null;
    }
  }, [experienceType, item]);

  if (!visible || !experienceInfo) return null;

  const { period, title, description, tags } = experienceInfo;

  return (
    <div className="overflow-hidden ml-1.5 pr-1">
      <div
        className="relative mb-8 ml-8 w-[480px] max-w-[60vw] rounded border-t-4 border-primary p-6 pr-5 shadow-[0_0_4px_rgba(0,0,0,0.25)] animate-tree-slide max-bp800:max-w-[75vw] before:absolute before:top-4 before:-left-7 before:h-1 before:w-7 before:bg-primary before:content-['']"
        style={{ transform: "translateX(-480px)", animationDelay: `${index * 150}ms` }}
      >
        <TreeItemInner period={period} title={title} description={description} tags={tags} />
        {showLGTM && (
          <div className="mt-6 w-[120px] text-center">
            <Counter text={lgtmText} onClick={handleLGTM} count={lgtmCount} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeItem;
