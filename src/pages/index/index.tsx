import React, { useRef } from 'react';
import WelcomeScreen from '../../components/screens/Welcome';
import AboutScreen from '../../components/screens/About';
import SkillsScreen from '../../components/screens/Skills';
import WorksScreen from '../../components/screens/Works';
import ShareScreen from '../../components/screens/Share';
import { Helmet } from 'react-helmet';

const IndexPage: React.FC = () => {
  const aboutScreenRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Helmet>
        <title>TinyKitten</title>
        <meta
          name="description"
          content="
      'フロントエンドエンジニア TinyKittenのポートフォリオです。"
        />
        <meta property="og:site_name" content="TinyKitten" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.PUBLIC_URL} />
        <meta property="og:title" content="TinyKitten" />
        <meta
          property="og:description"
          content="
      'フロントエンドエンジニア TinyKittenのポートフォリオです。"
        />
        <meta
          property="og:image"
          content={`${process.env.PUBLIC_URL}/ogp.png`}
        />
      </Helmet>
      <WelcomeScreen aboutScreenRef={aboutScreenRef} />
      <AboutScreen ref={aboutScreenRef} />
      <SkillsScreen />
      <WorksScreen />
      <ShareScreen />
    </>
  );
};

export default IndexPage;
