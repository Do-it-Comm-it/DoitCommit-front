import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '@src/pages/Home';
import { useAuthentication } from '@src/hooks/useAuthentication';
import { ThemeProvider } from 'styled-components';
import useDarkMode from '@src/hooks/useDarkMode';
import { dark, light } from '@src/utils/theme';
import HeaderNavigation from '@src/components/Organisms/HeaderNavigation';
import Sidebar from '@src/components/Organisms/Sidebar';
import GlobalStyle from './GlobalStyles';
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
      <HeaderNavigation />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
