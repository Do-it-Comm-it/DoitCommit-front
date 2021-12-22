import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle<{ open: boolean }>`
  * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
  }
  body {
    background-color: #eeeeee;
    width: 100%;
    min-height: 100vh;
    padding-left: 83px;
    padding-top: 52px;
    margin-left: ${({ open }) => open && 225}px;
    transition: 0.5s;
  }

`;

export default GlobalStyle;
