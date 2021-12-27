import React from 'react';
import styled from 'styled-components';
import ShareIcon from '@src/assets/share.svg';
import ProfileImageArea from '../../Molecules/MyPage/ProfileImageArea';
import ProfileInfoArea from '@src/components/Molecules/MyPage/ProfileInfoArea';

const ProfileArea = () => {
  return (
    <Container>
      <IconArea>
        <ShareIcon style={{ color: 'red', marginLeft: 'auto' }} />
      </IconArea>
      <ProfileImageArea />
      <ProfileInfoArea />
    </Container>
  );
};
const Container = styled.div`
  width: 514px;
  min-width: 514px;
  height: 100%;
  min-height: 702px;
  display: flex;
  padding: 15px;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 1);
  border: solid 1px rgba(234, 234, 234, 1);
  margin-right: 16px;
`;

const IconArea = styled.div`
  display: flex;
  width: 100%;
`;
export default ProfileArea;
