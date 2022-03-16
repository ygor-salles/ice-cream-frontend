import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./routes";
import { Sidebar } from "./shared/components";
import { SidebarProvider } from "./shared/contexts";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { GlobalStyle } from "./styles/global";

export function App() {
  return (
    <>
      <GlobalStyle />
      <AppThemeProvider>
        <SidebarProvider>
          <BrowserRouter>
            <Sidebar>
              <AppRoutes />
            </Sidebar>
          </BrowserRouter>
        </SidebarProvider>
      </AppThemeProvider>
    </>
  );
}
