import { createTheme } from "@mui/material";
import { green, purple } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: purple[700],
      dark: purple[800],
      light: purple[500],
      contrastText: "#ffffff",
    },
    secondary: {
      main: green[500],
      dark: green[400],
      light: green[300],
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#f7f6f3",
    },
  },
});
