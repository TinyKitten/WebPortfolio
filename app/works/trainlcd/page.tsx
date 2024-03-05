import { Metadata } from 'next';
import {
  AccessSection,
  ConceptSection,
  FirstSection,
  StoriesSection,
  TechnologySection,
} from './sections';

export const metadata: Metadata = {
  title: 'TrainLCD',
  description: '日本全国の鉄道路線で使える新感覚のナビゲーションアプリ',
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
