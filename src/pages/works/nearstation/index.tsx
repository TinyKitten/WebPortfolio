import React from 'react';
import NearStationFirstSection from './FirstSection';
import NearStationConceptSection from './ConceptSection';
import NearStationTechnologySection from './TechnologySection';
import NearStationAccessSection from './AccessSection';
import NearStationDesignSection from './DesignSection';

const WorksNearStationPage: React.FC = () => {
  return (
    <>
      <NearStationFirstSection />
      <NearStationConceptSection />
      <NearStationDesignSection />
      <NearStationTechnologySection />
      <NearStationAccessSection />
    </>
  );
};

export default WorksNearStationPage;
