'use client';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../constants/theme';
import StyledComponentsRegistry from '../lib/registry';

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};
