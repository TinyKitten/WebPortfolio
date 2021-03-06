import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Head from 'next/head';
import { existsGaId, GA_ID, recordPV } from '../lib/gtag';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useDarkMode from '../hooks/useDarkMode';
import { darkTheme, lightTheme } from '../constants/theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../constants/globalStyle';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  const { NEXT_PUBLIC_URL } = process.env;
  const { theme, themeReady } = useDarkMode();
  const router = useRouter();

  useEffect(() => {
    if (!existsGaId) {
      return;
    }

    const handleRouteChange = (path) => {
      recordPV(path);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  if (!themeReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${NEXT_PUBLIC_URL}/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${NEXT_PUBLIC_URL}/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${NEXT_PUBLIC_URL}/favicon-16x16.png`}
        />
        <link rel="manifest" href={`${NEXT_PUBLIC_URL}/manifest.json`} />
        <link
          rel="mask-icon"
          href={`${NEXT_PUBLIC_URL}/safari-pinned-tab.svg`}
          color="#008ffe"
        />
        <meta name="msapplication-TileColor" content="#008ffe" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="フロントエンドエンジニア TinyKittenのポートフォリオです。"
        />
        <meta property="og:site_name" content="TinyKitten" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${NEXT_PUBLIC_URL}`} />
        <meta property="og:title" content="TinyKitten" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:description"
          content="フロントエンドエンジニア TinyKittenのポートフォリオです。"
        />
        <meta property="og:image" content={`${NEXT_PUBLIC_URL}/ogp.png`} />
        <title>TinyKitten</title>
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://firestore.googleapis.com" />

        {existsGaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });`,
              }}
            />
          </>
        )}
      </Head>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
