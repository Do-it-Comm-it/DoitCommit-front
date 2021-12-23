import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from '@src/pages/Home';
import { useAuthentication } from '@src/hooks/useAuthentication';
import { ThemeProvider } from 'styled-components';
import useDarkMode from '@src/hooks/useDarkMode';
import { dark, light } from '@src/utils/theme';
import GlobalStyle from './GlobalStyles';
import '@src/assets/fonts/font.css';
import MyPage from '@src/pages/MyPage';
import PrivateRoute from '@src/routes/PriavteRoute';
import { CommonComponentWrapper, PublicRoute } from '@src/routes/Route';

const App = () => {
  const { theme } = useDarkMode();
  const { loading } = useAuthentication();

  if (loading) {
    return <></>;
  }

  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <BrowserRouter>
        <GlobalStyle />
        <CommonComponentWrapper>
          <PublicRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/mypage" component={MyPage} />
        </CommonComponentWrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
