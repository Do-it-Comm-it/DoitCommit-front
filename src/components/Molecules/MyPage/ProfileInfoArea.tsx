import { userAtom } from '@src/recoil/atom/user';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
const ProfileInfoArea = () => {
  const user = useRecoilValue(userAtom);
  return (
    <Container>
      <InfoArea>
        <Label>닉네임</Label>
        <span>{user?.nickname}</span>
      </InfoArea>
      <InfoArea>
        <Label>직군</Label>
        <span>{user?.position}</span>
      </InfoArea>
      <InfoArea>
        <Label>깃허브</Label>
        <span>www.github.com</span>
      </InfoArea>

      <InfoArea>
        <Label>관심기술</Label>
        <span>....</span>
      </InfoArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 10px;
`;
const InfoArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: flex-start;
`;
const Label = styled.label`
  color: #8f9294;
  font-size: 16px;
  font-weight: 400;
  margin-right: 69px;
`;

export default ProfileInfoArea;
