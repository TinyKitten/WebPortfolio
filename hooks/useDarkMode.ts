'use client';
import { useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark';

const useDarkMode = (): {
  theme: ThemeMode;
  toggleTheme: () => void;
} => {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const setMode = (mode: ThemeMode) => {
    typeof window !== 'undefined' && window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const localTheme =
    typeof window !== 'undefined' && window.localStorage.getItem('theme');

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    if (localTheme) {
      setTheme(localTheme as ThemeMode);
    } else if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches &&
      !localTheme
    ) {
      setTheme('dark');
    }
  }, [localTheme]);

  return {
    theme,
    toggleTheme,
  };
};

export default useDarkMode;
