import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '@src/pages/Login';
import Home from '@src/pages/Home';
const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
    </Switch>
  );
};

export default App;
