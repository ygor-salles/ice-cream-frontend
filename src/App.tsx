import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './routes';
import { MenuLateral } from './shared/components';
import { Login } from './shared/components/login/Login';
import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts';
import { GlobalStyle } from './styles/global';

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <AppThemeProvider>
          <Login>
            <DrawerProvider>
              <BrowserRouter>
                <MenuLateral>
                  <AppRoutes />
                </MenuLateral>
              </BrowserRouter>
            </DrawerProvider>
          </Login>
        </AppThemeProvider>
      </AuthProvider>
    </>
  );
};
