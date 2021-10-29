import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import Header from '../components/Header';
import GlobalStyles from '../constants/globalStyle';
import { halloweenDarkTheme, halloweenLightTheme } from '../constants/theme';
import useAnalytics from '../hooks/useAnalytics';
import useDarkMode from '../hooks/useDarkMode';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  const { theme, themeReady } = useDarkMode();
  const router = useRouter();

  const { recordPV } = useAnalytics();

  useEffect(() => {
    const handleRouteChange = () => {
      recordPV();
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [recordPV, router.events]);

  if (!themeReady) {
    return null;
  }

  return (
    // <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
    <ThemeProvider
      theme={theme === 'dark' ? halloweenDarkTheme : halloweenLightTheme}
    >
      <GlobalStyles />
      <Head>
        <title>TinyKitten</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
