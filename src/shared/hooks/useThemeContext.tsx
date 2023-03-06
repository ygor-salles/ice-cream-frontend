import { useContext } from 'react';
import { ThemeContext } from 'shared/contexts';

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }

  return context;
}
