import { ThemeProvider, Box } from '@mui/material';
import { ReactNode, createContext, useCallback, useMemo, useState } from 'react';
import { LightTheme, DarkTheme } from 'shared/themes';

import { IThemeContextData } from './utils/types';

interface AppThemeProviderProps {
  children: ReactNode;
}

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
