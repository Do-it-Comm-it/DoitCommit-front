// Google Login Button Component
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import DIText from '@src/components/Atoms/DIText';
import styled, { useTheme } from 'styled-components';
const GoogleLogin = () => {
  const theme = useTheme();
  return (
    <GoogleButton href={`${process.env.API_URL}/oauth2/authorization/google`}>
      <GoogleLogo size={32} />
      <DIText
        fontSize={20}
        fontFamily={theme.font.NotoSansKRRegular}
        fontColor="#353535"
      >
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
  width: 60%;
  height: 68px;
  background-color: #ffffff;
  border: 1px solid #cecece;
  border-radius: 6px;
  text-decoration: none;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.gray.gray600};
  margin-top: 44px;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
