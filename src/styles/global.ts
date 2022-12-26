import { createGlobalStyle } from 'styled-components';

export const Colors = {
  // Material UI Colors Light
  MAIN_PRIMARY_LIGHT: '#ab47bc',
  DARK_PRIMARY_LIGHT: '#4a148c',
  LIGHT_PRIMARY_LIGHT: '#9c27b0',

  BG_PAPER_LIGHT: '#ffffff',
  BG_DEFAULT_LIGHT: '#f7f6f3',

  // Material UI Colors Dark
  MAIN_PRIMARY_DARK: '#7b1fa2',
  DARK_PRIMARY_DARK: '#6a1b9a',
  LIGHT_PRIMARY_DARK: '#9c27b0',

  BG_PAPER_DARK: '#303134',
  BG_DEFAULT_DARK: '#202124',

  // Material UI Colors Secondary
  MAIN_SECONDARY: '#4caf50',
  DARK_SECONDARY: '#66bb6a',
  LIGHT_SECONDARY: '#81c784',

  // ---------------
  RED: '#E52E4D',
  RED_ERROR: '#d32f2f',
  PURPLE: '#5429CC',
  GREEN: '#33cc95',
  PURPLE_LIGHT: '#6933ff',

  TEXT_TITLE: '#363f5f',
  TEXT_BODY: '#969cb3',
  TEXT: '#00000099',
  BG: '#f0f2f5',
  WHITE: '#FFFFFF',
  GRAY: '#e0e0e0',
  DARKGRAY: 'darkgray',
};

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
  }
  body {
    font-size: 100%;
    -webkit-font-smoothing: antialiased;
  }

  // font-size: 16px (padrao-Desktop)
  html {

    p {
      font-size: 18px !important;
    }

    @media (max-width: 720px) {
      /* font-size: 87.5%; // 14px */
      font-size: 16px;

      p {
        font-size: 16px !important;
      }
    }
  }

  /* Sobreescrevendo a fonte de todos eles */
  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  // stylizando tudo que está desabilitado
  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
