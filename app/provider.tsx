'use client';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../constants/theme';
import useDarkMode from '../hooks/useDarkMode';
import StyledComponentsRegistry from '../lib/registry';

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useDarkMode();

  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};
