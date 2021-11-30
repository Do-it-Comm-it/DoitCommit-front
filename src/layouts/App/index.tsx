import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '@src/pages/Home';
import { useAuthentication } from '@src/hooks/useAuthentication';
import LoginModal from '@src/components/LoginModal';

const App = () => {
  useAuthentication();

  return (
    <>
      <LoginModal />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
};

export default App;
