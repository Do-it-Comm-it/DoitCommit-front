import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import useDarkMode from '@src/hooks/useDarkMode';
import { dark, light } from '@src/utils/theme';
import GlobalStyle from './GlobalStyles';
import '@src/assets/fonts/font.css';
import MyPage from '@src/pages/MyPage';
import Home from '@src/pages/Home';
import { CommonComponentWrapper, PublicRoute } from '@src/routes/Route';

const App = () => {
  const { theme } = useDarkMode();

  return (
    <React.Suspense fallback={<h2>Loading</h2>}>
      <ThemeProvider theme={theme === 'light' ? light : dark}>
        <BrowserRouter>
          <GlobalStyle />
          <CommonComponentWrapper>
            <PublicRoute exact path="/" component={Home} />
            <PublicRoute exact path="/mypage" component={MyPage} />
          </CommonComponentWrapper>
        </BrowserRouter>
      </ThemeProvider>
    </React.Suspense>
  );
};

export default App;
