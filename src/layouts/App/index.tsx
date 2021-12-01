import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '@src/pages/Home';
import { useAuthentication } from '@src/hooks/useAuthentication';

const App = () => {
  useAuthentication();

  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
};

export default App;
