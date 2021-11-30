// Github Login Button Component
import { signInGithub } from '@src/service/firebase';
import React from 'react';
import { GithubButton } from './styles';
import GithubLogo from '@src/assets/github.svg';
const GithubLogin = () => {
  return (
    <GithubButton onClick={signInGithub}>
      <GithubLogo
        width="42"
        height="42"
        style={{
          position: 'absolute',
          left: '98px',
          padding: '5.25px',
          verticalAlign: 'middle',
        }}
      />

      <span>깃허브 아이디로 로그인</span>
    </GithubButton>
  );
};

export default GithubLogin;
