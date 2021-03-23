import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    font-family: 'Open Sans';
    font-weight: 300;
    /* ThemeProvider의 theme props가 전달된다. */
    background-color: ${({ theme }) => theme.bodyBgColor};
  }
`;

export default GlobalStyle;
