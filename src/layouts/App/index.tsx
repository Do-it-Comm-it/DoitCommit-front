import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '@src/pages/Home';
import { useAuthentication } from '@src/hooks/useAuthentication';
import { ThemeProvider } from 'styled-components';
import useDarkMode from '@src/hooks/useDarkMode';
import { dark, light } from '@src/utils/theme';
import HeaderNavigation from '@src/components/Organisms/HeaderNavigation';

const App = () => {
  const { theme } = useDarkMode();
  const { loading } = useAuthentication();

  if (loading) {
    return <></>;
  }

  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <Route exact path="/" component={HeaderNavigation} />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
