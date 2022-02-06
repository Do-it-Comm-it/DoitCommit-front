import { useUser } from '@src/hooks/useAuthentication';
import React, { VFC } from 'react';
import { Route, Redirect } from 'react-router-dom';

interface Props {
  component: React.FC;
  path: string;
  exact?: boolean;
}
const PrivateRoute: VFC<Props> = ({ component, exact, path }) => {
  const { data: user } = useUser();

  return user ? <Route path={path} exact={exact} component={component} /> : <Redirect to="/" />;
};

export default PrivateRoute;
