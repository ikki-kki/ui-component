import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  body {
    font-family: 'Source Code Pro', monospace;
  }
`;

export default GlobalStyle;
