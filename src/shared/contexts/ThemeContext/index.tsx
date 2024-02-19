import { Box, ThemeProvider } from '@mui/material';
import { createContext, useCallback, useMemo, useState } from 'react';
import { DarkTheme, LightTheme } from 'shared/themes';

import { AppThemeProviderProps, IThemeContextData } from './types';

export const ThemeContext = createContext({} as IThemeContextData);

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setThemeName(oldThemeName => (oldThemeName === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = useMemo(() => {
    if (themeName === 'light') return LightTheme;

    return DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
