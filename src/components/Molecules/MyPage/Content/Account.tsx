import React from 'react';
import styled, { useTheme } from 'styled-components';
import DIText from '@src/components/Atoms/DIText';
const Account = () => {
  const theme = useTheme();
  return (
    <Container>
      <MenuContainer>
        <DIText fontSize={16} fontWeight={400} fontColor={theme.colors.dark.a7}>
          모든 기기에서 로그아웃
        </DIText>
        <DIText fontSize={14} fontWeight={400} fontColor={theme.colors.dark.a3} style={{ padding: '10px 0' }}>
          현재 세션을 제외한 모든 활성 세션에서 로그아웃되며 다시 로그인해야합니다.
        </DIText>
        <Button onClick={() => {}}>로그아웃</Button>
      </MenuContainer>

      <MenuContainer>
        <DIText fontSize={16} fontWeight={400} fontColor={theme.colors.dark.a7}>
          내 계정 삭제
        </DIText>
        <DIText fontSize={14} fontWeight={400} fontColor={theme.colors.dark.a3} style={{ padding: '10px 0' }}>
          7일...
        </DIText>
        <Button onClick={() => {}}>계정 삭제</Button>
      </MenuContainer>
    </Container>
  );
};

export default Account;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const MenuContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
`;

const Button = styled.button`
  width: 100px;
  height: 32px;
  background-color: #ffffff;
  border: 1px solid #ff8b8b;
  padding: 6px 16px;
  border-radius: 2px;
  color: #ff4b4b;
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;
`;
