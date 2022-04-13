import { useUser } from '@src/hooks/useAuthentication';
import React, { VFC } from 'react';
import { Route } from 'react-router-dom';

interface Props {
  component: React.FC;
  path: string;
}
const PrivateRoute: VFC<Props> = ({ component, path }) => {
  const { data: user } = useUser();

  return user ? <Route path={path} element={component} /> : <Route path="/" />;
};

export default PrivateRoute;
