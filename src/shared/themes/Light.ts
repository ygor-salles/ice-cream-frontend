import { createTheme } from '@mui/material';
import { green, purple } from '@mui/material/colors';

// teste
export const LightTheme = createTheme({
  palette: {
    primary: {
      main: purple[400],
      dark: purple[900],
      light: purple[500],
      contrastText: '#ffffff',
    },
    secondary: {
      main: green[500],
      dark: green[400],
      light: green[300],
      contrastText: '#ffffff',
    },
    background: {
      paper: '#ffffff',
      default: '#f7f6f3',
    }
  },
});
