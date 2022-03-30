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
    background-color: ${({ theme }) => theme.colors.primary.light500};
    width: 100%;
    min-height: 100%;
  }

  .ql-editor.ql-blank::before{
    font-size: 16px;
    color: ${({ theme }) => theme.colors.black};
  }
`;

export default GlobalStyle;
