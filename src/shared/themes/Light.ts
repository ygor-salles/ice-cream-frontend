import { createTheme } from '@mui/material';
import { Colors } from 'styles/global';

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: Colors.MAIN_PRIMARY_LIGHT,
      dark: Colors.DARK_PRIMARY_LIGHT,
      light: Colors.LIGHT_PRIMARY_LIGHT,
      contrastText: Colors.WHITE,
    },
    secondary: {
      main: Colors.MAIN_SECONDARY,
      dark: Colors.DARK_SECONDARY,
      light: Colors.LIGHT_SECONDARY,
      contrastText: Colors.WHITE,
    },
    background: {
      paper: Colors.BG_PAPER_LIGHT,
      default: Colors.BG_DEFAULT_LIGHT,
    },
    info: {
      main: Colors.WHITE,
    },
  },
});
