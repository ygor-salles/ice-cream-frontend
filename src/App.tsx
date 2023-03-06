import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './routes';
import { MenuLateral } from './shared/components';
import { AppThemeProvider, AuthProvider, DrawerProvider, ToastProvider } from './shared/contexts';
import { GlobalStyle } from './styles/global';

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <AppThemeProvider>
          <ToastProvider>
            <DrawerProvider>
              <BrowserRouter>
                <MenuLateral>
                  <AppRoutes />
                </MenuLateral>
              </BrowserRouter>
            </DrawerProvider>
          </ToastProvider>
        </AppThemeProvider>
      </AuthProvider>
    </>
  );
};
