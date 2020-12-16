import React from 'react';
import { Helmet } from 'react-helmet';
import TrainLCDFirstSection from './FirstSection';
import TrainLCDConceptSection from './ConceptSection';
import TrainLCDTechnologySection from './TechnologySection';
import TrainLCDAccessSection from './AccessSection';
import TrainLCDDesignSection from './DesignSection';
import TrainLCDIMG from '../../../assets/works/trainlcd.png';

const WorksTrainLCDPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>TrainLCD</title>
        <meta name="description" content="電車のLCDをスマホで" />
        <meta property="og:site_name" content="TinyKitten" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${process.env.PUBLIC_URL}/works/trainlcd`}
        />
        <meta property="og:title" content="TrainLCD" />
        <meta property="og:description" content="電車のLCDをスマホで" />
        <meta property="og:image" content={TrainLCDIMG} />
      </Helmet>
      <TrainLCDFirstSection />
      <TrainLCDConceptSection />
      <TrainLCDDesignSection />
      <TrainLCDTechnologySection />
      <TrainLCDAccessSection />
    </>
  );
};

export default WorksTrainLCDPage;
