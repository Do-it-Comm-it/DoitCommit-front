import React, { VFC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from './recoil/atom/user';

interface Props {
  component: React.FC;
  path: string;
  exact: boolean;
}
const PrivateRoute: VFC<Props> = ({ component, exact, path }) => {
  const user = useRecoilValue(userAtom);

  return user ? <Route path={path} exact={exact} component={component} /> : <Redirect to="/" />;
};

export default PrivateRoute;
