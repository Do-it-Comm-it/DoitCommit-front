import React from 'react';
import styled from 'styled-components';
import ProfileImageArea from './ProfileImageArea';
import ProfileInfoArea from './ProfileInfoArea';

const ProfileArea = () => {
  return (
    <Container>
      <ProfileImageArea />
      <ProfileInfoArea />
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  margin-top: 70px;
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
`;
export default ProfileArea;
