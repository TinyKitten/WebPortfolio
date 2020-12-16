import React from 'react';
import TeamKittenFirstSection from './FirstSection';
import TeamKittenConceptSection from './ConceptSection';
import TeamKittenTechnologySection from './TechnologySection';
import TeamKittenAccessSection from './AccessSection';
import TeamKittenDesignSection from './DesignSection';

const WorksTeamKittenPage: React.FC = () => {
  return (
    <>
      <TeamKittenFirstSection />
      <TeamKittenConceptSection />
      <TeamKittenDesignSection />
      <TeamKittenTechnologySection />
      <TeamKittenAccessSection />
    </>
  );
};

export default WorksTeamKittenPage;
