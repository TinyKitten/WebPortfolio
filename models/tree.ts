export type ResumeItemObject = {
  id: number;
  startAtFullYear: number;
  endAtFullYear: number | null;
  companyName: string;
  description: string;
};

export type WorksStoryItemObject = {
  id: number;
  startAt: string;
  finishedAt: string | null;
  title: string;
  description: string;
  tags: string[];
};
