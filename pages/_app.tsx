import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import ReactModal from 'react-modal';
import { ThemeProvider } from 'styled-components';
import Header from '../components/Header';
import GlobalStyles from '../constants/globalStyle';
import { darkTheme, lightTheme } from '../constants/theme';
import useDarkMode from '../hooks/useDarkMode';
import '../styles/Modal.css';

ReactModal.setAppElement('#__next');

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  const { theme, themeReady } = useDarkMode();

  if (!themeReady) {
    return null;
  }

  return (
    <ThemeProvider
      theme={theme === 'dark' ? darkTheme : lightTheme}
    >
      <GlobalStyles />
      <Head>
        <title>TinyKitten</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
