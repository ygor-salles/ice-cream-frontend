import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";

import { useSidebarContext } from "../shared/contexts";

export function AppRoutes() {
  const { toggleSidebarOpen } = useSidebarContext();
  return (
    <Routes>
      <Route
        path="/pagina-inicial"
        element={
          <Button
            variant="contained"
            color="primary"
            onClick={toggleSidebarOpen}
          >
            Toogle Sidebar
          </Button>
        }
      />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
}
