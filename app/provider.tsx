'use client';

import dynamic from 'next/dynamic';
import { DynamicLoading } from '../components/DynamicLoading';
import StyledComponentsRegistry from '../lib/registry';
import { isDark } from '../utils/isDark';
import { darkTheme, lightTheme } from '../constants/theme';

const ThemeProvider = dynamic(
  () => import('styled-components').then((module) => module.ThemeProvider),
  { ssr: false, loading: DynamicLoading }
);

export const Provider = ({ children }: { children: React.ReactNode }) => (
  <StyledComponentsRegistry>
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  </StyledComponentsRegistry>
);
