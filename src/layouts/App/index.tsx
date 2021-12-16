import React, { useEffect, useCallback } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Home from '@src/pages/Home';
import { useAuthentication } from '@src/hooks/useAuthentication';
import { ThemeProvider } from 'styled-components';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';
import useDarkMode from '@src/hooks/useDarkMode';
import { dark, light } from '@src/utils/theme';
import HeaderNavigation from '@src/components/Organisms/HeaderNavigation';
import Sidebar from '@src/components/Organisms/Sidebar';
import GlobalStyle from './GlobalStyles';
import '@src/assets/fonts/font.css';
import RegisterModal from '@src/components/Organisms/RegisterModal';
import LoginModal from '@src/components/Organisms/LoginModal';

const App = () => {
  const { theme } = useDarkMode();
  const { loading } = useAuthentication();

  const { user } = useAuthentication();
  const history = useHistory();
  const [modal, setModal] = useRecoilState(modalAtom);

  useEffect(() => {
    // when user joined first.
    if (user && !user.isEnrolled) {
      setModal({ id: 'register', visible: true });
    }
  }, [user, history, setModal]);

  const onFinish = useCallback(() => {
    setModal({ id: 'register', visible: false });
  }, [setModal]);

  if (loading) {
    return <></>;
  }

  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <GlobalStyle />
      <Sidebar />
      <HeaderNavigation />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
      {modal.id === 'login' && modal.visible && (
        <LoginModal
          onClose={() => {
            setModal({ id: 'login', visible: false });
          }}
        />
      )}
      {modal.id === 'register' && modal.visible && <RegisterModal onFinish={onFinish} />}
    </ThemeProvider>
  );
};

export default App;
