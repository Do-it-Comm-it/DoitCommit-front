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
    background-color: #F9F9F9;
    width: 100%;
    min-height: 100%;
  }
`;

export default GlobalStyle;
