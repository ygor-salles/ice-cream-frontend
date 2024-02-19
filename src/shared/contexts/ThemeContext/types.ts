import { ReactNode } from 'react';

export interface AppThemeProviderProps {
  children: ReactNode;
}

export interface IThemeContextData {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}
