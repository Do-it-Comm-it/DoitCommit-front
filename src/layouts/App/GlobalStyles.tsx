import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
  }
  body {
    background-color: ${({ theme }) => theme.colors.primary.light500};
    width: 100%;

  }

  .ql-editor.ql-blank::before{
    font-size: 16px;
    color: ${({ theme }) => theme.colors.black};
  }
`;

export default GlobalStyle;
