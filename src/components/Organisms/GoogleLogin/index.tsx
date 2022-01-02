// Google Login Button Component
import React from 'react';
import { signInGoogle } from '@src/service/firebase';
import { FcGoogle } from 'react-icons/fc';
import DIText from '@src/components/Atoms/DIText';
import styled, { useTheme } from 'styled-components';
const GoogleLogin = () => {
  const theme = useTheme();

  return (
    <GoogleButton href={process.env.GOOGLE_URL}>
      <GoogleLogo size={30} />
      <DIText fontSize={20} fontFamily={theme.font.EliceDigitalBaeumBold}>
        Google로 계속
      </DIText>
    </GoogleButton>
  );
};

const GoogleLogo = styled(FcGoogle)`
  margin-right: 20px;
`;

export default GoogleLogin;

const GoogleButton = styled.a`
  display: inline-flex;
  width: 383px;
  height: 68px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid #dadada;
  border-radius: 6px;
  text-decoration: none;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.dark.a5};
  margin-top: 44px;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
