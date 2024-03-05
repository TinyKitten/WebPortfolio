'use client';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../constants/theme';
import useDarkMode from '../hooks/useDarkMode';

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const { theme, themeReady } = useDarkMode();

  if (!themeReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
};
