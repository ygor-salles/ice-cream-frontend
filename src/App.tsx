import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './routes';
import { MenuLateral } from './shared/components';
import { AppThemeProvider, DrawerProvider } from './shared/contexts';
import { GlobalStyle } from './styles/global';

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppThemeProvider>
        <DrawerProvider>
          <BrowserRouter>
            <MenuLateral>
              <AppRoutes />
            </MenuLateral>
          </BrowserRouter>
        </DrawerProvider>
      </AppThemeProvider>
    </>
  );
};
