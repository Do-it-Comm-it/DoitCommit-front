import ProfileArea from '@src/components/Organisms/MyPage/ProfileArea';
import React from 'react';
import styled from 'styled-components';
import ProfileFormArea from '@src/components/Organisms/MyPage/ProfileFormArea';
const MyPage = () => {
  return (
    <Container>
      <h2>마이페이지</h2>
      <Content>
        <ProfileArea />
        <ProfileFormArea />
      </Content>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 70px;
  min-height: 702px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  max-height: 702px;
`;

export default MyPage;
