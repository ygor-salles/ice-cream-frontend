import { BrowserRouter } from 'react-router-dom';

import { AppThemeProvider, DrawerProvider } from './shared/contexts';
import { MenuLateral } from './shared/components';
import { AppRoutes } from './routes';
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
