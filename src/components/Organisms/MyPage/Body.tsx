import React from 'react';
import styled from 'styled-components';
import Header from '@src/components/Molecules/MyPage/Headers';
import ProfileImageArea from '@src/components/Molecules/MyPage/ProfileImageArea';
import ProfileInfoArea from '@src/components/Molecules/MyPage/ProfileInfoArea';
import { Route, Routes } from 'react-router-dom';
import Setting from '@src/components/Molecules/MyPage/Setting';
import { devices } from '@src/utils/theme';
const Body = () => {
  return (
    <Container>
      <Header />
      <Routes>
        <Route
          path="/info"
          element={
            <ProfileContent>
              <ProfileImageArea />
              <ProfileInfoArea />
            </ProfileContent>
          }
        />
        <Route
          path="/setting"
          element={
            <SettingContent>
              <Setting />
            </SettingContent>
          }
        />
      </Routes>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding-top: 30px;
  justify-content: center;

  @media ${devices.tablet} {
    flex-wrap: wrap;
  }
`;

const SettingContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
`;
export default Body;
