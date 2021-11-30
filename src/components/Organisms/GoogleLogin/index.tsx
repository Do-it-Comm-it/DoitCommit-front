// Google Login Button Component
import React from 'react';
import { signInGoogle } from '@src/service/firebase';
import { GoogleButton } from './styles';
import GoogleLogo from '@src/assets/google.svg';
const GoogleLogin = () => {
  return (
    <GoogleButton onClick={signInGoogle}>
      <GoogleLogo
        width="42"
        height="42"
        style={{
          position: 'absolute',
          left: '98px',
          padding: '5.25px',
          verticalAlign: 'middle',
        }}
      />
      <span>구글 아이디로 로그인</span>
    </GoogleButton>
  );
};

export default GoogleLogin;
