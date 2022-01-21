import React from 'react';
import styled from 'styled-components';
import DILink from '@src/components/Atoms/DILink';
const Header = () => {
  return (
    <Container>
      <Content>
        <DILink to="/mypage" fontColor="#8F9294" fontSize={28} fontWeight={500}>
          마이페이지
        </DILink>
        <DILink to="/mypage/setting" fontColor="#8F9294" fontSize={28} fontWeight={500}>
          환경 설정
        </DILink>
      </Content>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #eaeaea;
  padding: 30px 0;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
  width: 30%;
`;
