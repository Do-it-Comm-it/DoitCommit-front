// Github Login Button Component
import { signInGithub } from '@src/service/firebase';
import React from 'react';
import DIText from '@src/components/Atoms/DIText';
import styled, { useTheme } from 'styled-components';
import { BsGithub } from 'react-icons/bs';
const GithubLogin = () => {
  const theme = useTheme();

  return (
    <GithubButton onClick={signInGithub}>
      <GithubLogo size={30} />
      <DIText fontSize={20} fontFamily={theme.font.EliceDigitalBaeumBold}>
        Github로 계속
      </DIText>
    </GithubButton>
  );
};

const GithubButton = styled.button`
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
`;

const GithubLogo = styled(BsGithub)`
  margin-right: 20px;
`;

export default GithubLogin;
