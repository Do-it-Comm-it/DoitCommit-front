import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
  }
  html {
  height: 100vh;
}
  body {
    background-color: #eeeeee;
    width: 100%;
    min-height: 100%;
  }
`;

export default GlobalStyle;
