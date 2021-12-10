import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
  }
  body {
    width: 100%;
    min-height: 100vh;
    padding-left: 83px;
  }

`;

export default GlobalStyle;
