import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '@src/pages/Home';
import { useAuthentication } from '@src/hooks/useAuthentication';
import { ThemeProvider } from 'styled-components';
import Modal from '@src/components/Organisms/Modal';
import useDarkMode from '@src/hooks/useDarkMode';
import { dark, light } from '@src/utils/theme';
import HeaderNavigation from '@src/components/Organisms/HeaderNavigation';
import Sidebar from '@src/components/Organisms/Sidebar';
import GlobalStyle from './GlobalStyles';
import '@src/assets/fonts/font.css';
import MyPage from '@src/pages/MyPage';
import PrivateRoute from '@src/PriavteRoute';

const App = () => {
  const { theme } = useDarkMode();
  const { loading } = useAuthentication();
  if (loading) {
    return <></>;
  }

  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <GlobalStyle />
      <Sidebar />
      <Modal />
      <HeaderNavigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/mypage" component={MyPage} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
