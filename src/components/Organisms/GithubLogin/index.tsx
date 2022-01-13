// Github Login Button Component
import React from 'react';
import DIText from '@src/components/Atoms/DIText';
import styled, { useTheme } from 'styled-components';
import { BsGithub } from 'react-icons/bs';
const GithubLogin = () => {
  const theme = useTheme();

  return (
    <GithubButton href={`${process.env.API_URL}/oauth2/authorization/github`}>
      <GithubLogo size={30} />
      <DIText fontSize={20} fontFamily={theme.font.EliceDigitalBaeumBold}>
        Github로 계속
      </DIText>
    </GithubButton>
  );
};

const GithubButton = styled.a`
  display: inline-flex;
  width: 383px;
  height: 68px;
  background-color: ${({ theme }) => theme.colors.dark.a5};
  border: none;
  border-radius: 6px;
  font-size: 20px;
  color: white;
  margin-top: 12px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

const GithubLogo = styled(BsGithub)`
  margin-right: 20px;
`;

export default GithubLogin;
