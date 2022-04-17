// Github Login Button Component
import React from 'react';
import DIText from '@src/components/Atoms/DIText';
import styled, { useTheme } from 'styled-components';
import { BsGithub } from 'react-icons/bs';
const GithubLogin = () => {
  const theme = useTheme();

  return (
    <GithubButton href={`${process.env.API_URL}/oauth2/authorization/github`}>
      <GithubLogo size={32} />
      <DIText
        fontSize={20}
        fontFamily={theme.font.NotoSansKRRegular}
        fontColor="#FEFEFE"
      >
        Github로 계속
      </DIText>
    </GithubButton>
  );
};

const GithubButton = styled.a`
  display: inline-flex;
  width: 60%;
  height: 68px;
  background-color: #353535;
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
