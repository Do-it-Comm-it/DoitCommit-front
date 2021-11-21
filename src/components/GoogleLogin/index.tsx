// Google Login Button Component
import React from 'react';
import GoogleButton from 'react-google-button';
import { signInGoogle } from '@src/service/firebase';
const GoogleLogin = () => {
  return <GoogleButton onClick={signInGoogle} type="dark" />;
};

export default GoogleLogin;
