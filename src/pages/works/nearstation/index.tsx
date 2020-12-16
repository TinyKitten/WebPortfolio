import React from 'react';
import { Helmet } from 'react-helmet';
import NearStationFirstSection from './FirstSection';
import NearStationConceptSection from './ConceptSection';
import NearStationTechnologySection from './TechnologySection';
import NearStationAccessSection from './AccessSection';
import NearStationDesignSection from './DesignSection';
import NearStationIMG from '../../../assets/works/nearstation.png';

const WorksNearStationPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>NearStation</title>
        <meta
          name="description"
          content="最寄り駅とその路線がひと目で分かるWebアプリ"
        />
        <meta property="og:site_name" content="TinyKitten" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${process.env.PUBLIC_URL}/works/nearstation`}
        />
        <meta property="og:title" content="NearStation" />
        <meta
          property="og:description"
          content="最寄り駅とその路線がひと目で分かるWebアプリ"
        />
        <meta property="og:image" content={NearStationIMG} />
      </Helmet>

      <NearStationFirstSection />
      <NearStationConceptSection />
      <NearStationDesignSection />
      <NearStationTechnologySection />
      <NearStationAccessSection />
    </>
  );
};

export default WorksNearStationPage;
