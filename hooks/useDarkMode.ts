import { useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark';

const useDarkMode = (): {
  theme: ThemeMode;
  themeReady: boolean;
  toggleTheme: () => void;
} => {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [themeReady, setThemeReady] = useState(false);
  const setMode = (mode: ThemeMode) => {
    process.browser && window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const localTheme = process.browser && window.localStorage.getItem('theme');

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
      process.browser &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches &&
      !localTheme
    ) {
      setTheme('dark');
    }

    setThemeReady(true);
  }, [localTheme]);

  return {
    theme,
    themeReady,
    toggleTheme,
  };
};

export default useDarkMode;
