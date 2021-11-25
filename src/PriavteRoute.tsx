import React, { VFC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthentication } from './hooks/useAuthentication';

interface Props {
  component: React.FC;
  path: string;
  exact: boolean;
}
const PrivateRoute: VFC<Props> = ({ component, exact, path }) => {
  const user = useAuthentication();

  return user ? <Route path={path} exact={exact} component={component} /> : <Redirect to="/login" />;
};

export default PrivateRoute;
