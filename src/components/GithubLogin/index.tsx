// Github Login Button Component
import { signInGithub } from '@src/service/firebase';
import React from 'react';
import { GithubButton } from './styles';

import { BsGithub } from 'react-icons/bs';
const GithubLogin = () => {
  return (
    <GithubButton onClick={signInGithub}>
      <BsGithub
        style={{
          marginRight: '37px',
          verticalAlign: 'middle',
          width: '42px',
          height: '42px',
        }}
      />
      <span>깃허브 아이디로 로그인</span>
    </GithubButton>
  );
};

export default GithubLogin;
