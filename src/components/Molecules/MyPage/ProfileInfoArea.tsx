import { userAtom } from '@src/recoil/atom/user';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
const ProfileInfoArea = () => {
  const user = useRecoilValue(userAtom);

  // TODO : default value about registered user
  return (
    <Container>
      <InfoArea>
        <Label>이름</Label>
        <span>...</span>
      </InfoArea>
      <InfoArea>
        <Label>직군</Label>
        <span>...</span>
      </InfoArea>
      <InfoArea>
        <Label>이메일</Label>
        <span>...</span>
      </InfoArea>

      <InfoArea>
        <Label>관심기술</Label>
        <LabelContainer>
          {user?.tech?.map((item, index) => (
            <TechLabel key={index}>{item}</TechLabel>
          ))}
        </LabelContainer>
      </InfoArea>
      <InfoArea>
        <Label>깃허브</Label>
        <span>...</span>
      </InfoArea>
      <InfoArea>
        <Label>URL</Label>
        <span>...</span>
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
  width: 30%;
  white-space: nowrap;
`;
const LabelContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;
const TechLabel = styled.label`
  background-color: #aacd06;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  padding: 5px 6px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

export default ProfileInfoArea;
