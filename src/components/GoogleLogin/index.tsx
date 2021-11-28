// Google Login Button Component
import React from 'react';
import { signInGoogle } from '@src/service/firebase';
import { GoogleButton } from './styles';
import { IoLogoGoogle } from 'react-icons/io';

const GoogleLogin = () => {
  return (
    <GoogleButton onClick={signInGoogle}>
      <IoLogoGoogle
        style={{
          marginRight: '50px',
          verticalAlign: 'middle',
          width: '42px',
          height: '42px',
        }}
      />
      <span>구글 아이디로 로그인</span>
    </GoogleButton>
  );
};

export default GoogleLogin;
