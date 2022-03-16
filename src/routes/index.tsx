import { Button } from "@mui/material";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useSidebarContext } from "../shared/contexts";

export function AppRoutes() {
  const { toggleSidebarOpen, setSidebarOptions } = useSidebarContext();

  useEffect(() => {
    setSidebarOptions([
      {
        icon: "home",
        path: "/pagina-inicial",
        label: "Pagina inicial",
      },
    ]);
  }, []);

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
