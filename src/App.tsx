import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./routes";
import { Sidebar } from "./shared/components";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { GlobalStyle } from "./styles/global";

export function App() {
  return (
    <>
      <GlobalStyle />
      <AppThemeProvider>
        <BrowserRouter>
          <Sidebar>
            <AppRoutes />
          </Sidebar>
        </BrowserRouter>
      </AppThemeProvider>
    </>
  );
}
