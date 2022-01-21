import React from 'react';
import styled from 'styled-components';
import Header from '@src/components/Molecules/MyPage/Headers';
import ProfileImageArea from '@src/components/Molecules/MyPage/ProfileImageArea';
import ProfileInfoArea from '@src/components/Molecules/MyPage/ProfileInfoArea';
import { Route, useRouteMatch } from 'react-router-dom';
const Body = () => {
  return (
    <Container>
      <Header />
      <Content>
        <Route exact path="/mypage">
          <ProfileImageArea />
          <ProfileInfoArea />
        </Route>
        <Route exact path="/mypage/setting">
          <h2>hi</h2>
        </Route>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding-top: 30px;
`;
export default Body;
