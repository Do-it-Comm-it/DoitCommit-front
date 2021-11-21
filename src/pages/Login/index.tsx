import GithubLogin from '@src/components/GithubLogin';
import GoogleLogin from '@src/components/GoogleLogin';
import { useAuthentication } from '@src/hooks/useAuthentication';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
const Login = () => {
  const { user } = useAuthentication();
  const history = useHistory();
  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user]);

  return (
    <div>
      <h2>Login Page</h2>
      <GithubLogin />
      <GoogleLogin />
    </div>
  );
};

export default Login;
