import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import TeamKittenFirstSection from './FirstSection';
import TeamKittenConceptSection from './ConceptSection';
import TeamKittenTechnologySection from './TechnologySection';
import TeamKittenAccessSection from './AccessSection';
import TeamKittenDesignSection from './DesignSection';
import TeamKittenIMG from '../../../assets/works/teamkitten.png';

const WorksTeamKittenPage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, []);

  return (
    <div ref={ref}>
      <Helmet>
        <title>TeamKitten</title>
        <meta
          name="description"
          content="
      'TeamKittenというネットサークルのメンバー管理API設計・実装、ウェブサイトの開発を担当しました。"
        />
        <meta property="og:site_name" content="TinyKitten" />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${process.env.PUBLIC_URL}/works/teamkitten`}
        />
        <meta property="og:title" content="TeamKitten" />
        <meta
          property="og:description"
          content="
      'TeamKittenというネットサークルのメンバー管理API設計・実装、ウェブサイトの開発を担当しました。"
        />
        <meta property="og:image" content={TeamKittenIMG} />
      </Helmet>

      <TeamKittenFirstSection />
      <TeamKittenConceptSection />
      <TeamKittenDesignSection />
      <TeamKittenTechnologySection />
      <TeamKittenAccessSection />
    </div>
  );
};

export default WorksTeamKittenPage;
