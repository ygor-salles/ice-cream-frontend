import { createTheme } from '@mui/material';

import { Colors } from '../../styles/global';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: Colors.MAIN_PRIMARY_DARK,
      dark: Colors.DARK_PRIMARY_DARK,
      light: Colors.LIGHT_PRIMARY_DARK,
      contrastText: Colors.WHITE,
    },
    secondary: {
      main: Colors.MAIN_SECONDARY,
      dark: Colors.DARK_SECONDARY,
      light: Colors.LIGHT_SECONDARY,
      contrastText: Colors.WHITE,
    },
    background: {
      paper: Colors.BG_PAPER_DARK,
      default: Colors.BG_DEFAULT_DARK,
    },
    info: {
      main: Colors.WHITE,
    },
  },
  typography: {
    allVariants: {
      color: Colors.WHITE,
    },
  },
});
