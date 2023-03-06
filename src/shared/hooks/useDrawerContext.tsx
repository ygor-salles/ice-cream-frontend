import { useContext } from 'react';
import { DrawerContext } from 'shared/contexts';

export function useDrawerContext() {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error('useDrawerContext must be used within DrawerProvider');
  }

  return context;
}
