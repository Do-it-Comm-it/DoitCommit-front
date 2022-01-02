import React from 'react';
import styled, { useTheme } from 'styled-components';
import DIText from '@src/components/Atoms/DIText';
const Security = () => {
  const theme = useTheme();
  // TODO : Resigning user's confirm will be needed with modal
  return (
    <Container>
      <MenuContainer>
        <DIText fontSize={16} fontWeight={400} fontColor={theme.colors.dark.a7}>
          검색 내역 지우기
        </DIText>
        <DIText fontSize={14} fontWeight={400} fontColor={theme.colors.dark.a3} style={{ padding: '10px 0' }}>
          최근 30일간의 검색 데이터를 지웁니다
        </DIText>
        <Button onClick={() => {}}>모두 지우기</Button>
      </MenuContainer>
    </Container>
  );
};

export default Security;

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
