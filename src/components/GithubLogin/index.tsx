// Github Login Button Component
import { signInGithub } from '@src/service/firebase';
import React from 'react';
import GithubButton from 'react-github-login-button';

const GithubLogin = () => {
  return <GithubButton type="dark" label="Sign in with Github" onClick={signInGithub} />;
};

export default GithubLogin;
