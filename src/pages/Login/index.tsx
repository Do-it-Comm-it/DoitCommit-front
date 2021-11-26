import GithubLogin from '@src/components/GithubLogin';
import GoogleLogin from '@src/components/GoogleLogin';
import { useAuthentication } from '@src/hooks/useAuthentication';
import { userAtom } from '@src/recoil/atom/user';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useRecoilValue } from 'recoil';
const Login = () => {
  const user = useAuthentication();
  const history = useHistory();
  useEffect(() => {
    if (user && user.isEnrolled) {
      history.push('/');
    }
    if (user && !user.isEnrolled) {
      history.push('/register');
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
