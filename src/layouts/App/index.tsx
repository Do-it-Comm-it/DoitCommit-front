import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import useAuthentication from '@src/hooks/useAuthentication';
import { ThemeProvider } from 'styled-components';
import useDarkMode from '@src/hooks/useDarkMode';
import { dark, light } from '@src/utils/theme';
import GlobalStyle from './GlobalStyles';
import '@src/assets/fonts/font.css';
import MyPage from '@src/pages/MyPage';
import { CommonComponentWrapper, PublicRoute } from '@src/routes/Route';
import { getUserInfo } from '@src/service/api';

const Home = React.lazy(() => import('@src/pages/Home/index'));

const App = () => {
  const { theme } = useDarkMode();
  const { authorize } = useAuthentication();
  useEffect(() => {
    const fetchUser = async () => {
      await getUserInfo().then((user) => {
        authorize(user);
      });
    };

    fetchUser();
  }, [authorize]);

  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <BrowserRouter>
        <GlobalStyle />
        <CommonComponentWrapper>
          <PublicRoute exact path="/" component={Home} />
          <PublicRoute exact path="/mypage" component={MyPage} />
        </CommonComponentWrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
