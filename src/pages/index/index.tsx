import React, { Suspense, useRef } from 'react';
const WelcomeScreen = React.lazy(
  () => import('../../components/screens/Welcome')
);
const AboutScreen = React.lazy(() => import('../../components/screens/About'));
const SkillsScreen = React.lazy(
  () => import('../../components/screens/Skills')
);
const WorksScreen = React.lazy(() => import('../../components/screens/Works'));
const ShareScreen = React.lazy(() => import('../../components/screens/Share'));
import { Helmet } from 'react-helmet';

const IndexPage: React.FC = () => {
  const aboutScreenRef = useRef<HTMLDivElement | null>(null);

  return (
    <Suspense fallback={<></>}>
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
    </Suspense>
  );
};

export default IndexPage;
