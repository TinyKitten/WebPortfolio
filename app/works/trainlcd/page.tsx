import type { Metadata } from "next";
import {
  AccessSection,
  ConceptSection,
  FirstSection,
  StoriesSection,
  TechnologySection,
} from "./sections";

export const metadata: Metadata = {
  title: "TrainLCD",
  description: "電車のあの画面、持ち歩けます。",
};

const WorksTrainLCDPage = () => (
  <>
    <FirstSection />
    <ConceptSection />
    <StoriesSection />
    <TechnologySection />
    <AccessSection />
  </>
);

export default WorksTrainLCDPage;
