import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
  }
  html {
    width: 100%;
  height: 100vh;
}
  body {
    background-color: ${({ theme }) => theme.colors.body};
    width: 100%;
    min-height: 100%;
  }
`;

export default GlobalStyle;
