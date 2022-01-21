import { userAtom } from '@src/recoil/atom/user';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
const ProfileInfoArea = () => {
  const user = useRecoilValue(userAtom);

  // TODO : default value about registered user
  return (
    <Container>
      <Content>
        <Label>이름</Label>
        <Input />
      </Content>

      <Content>
        <Label>이메일</Label>
        <Input />
      </Content>

      <Content>
        <Label>전문 분야</Label>
        <Input />
      </Content>

      <Content>
        <Label>관심기술</Label>
        <Input />
      </Content>

      <Content>
        <Label>Github</Label>
        <Input />
      </Content>

      <Content>
        <Label>URL</Label>
        <Input />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 15px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 36px;
`;

const Label = styled.label`
  color: #8f9294;
  font-size: 20px;
  font-weight: 500;
  white-space: nowrap;
`;

const Input = styled.input`
  width: 100%;
  height: 59px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(143, 146, 148, 0.1);
  outline: none;
  border: none;
  padding-left: 15px;
`;
export default ProfileInfoArea;
