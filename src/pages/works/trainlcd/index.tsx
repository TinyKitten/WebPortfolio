import React from 'react';
import TrainLCDFirstSection from './FirstSection';
import TrainLCDConceptSection from './ConceptSection';
import TrainLCDTechnologySection from './TechnologySection';
import TrainLCDAccessSection from './AccessSection';
import TrainLCDDesignSection from './DesignSection';

const WorksTrainLCDPage: React.FC = () => {
  return (
    <>
      <TrainLCDFirstSection />
      <TrainLCDConceptSection />
      <TrainLCDDesignSection />
      <TrainLCDTechnologySection />
      <TrainLCDAccessSection />
    </>
  );
};

export default WorksTrainLCDPage;
