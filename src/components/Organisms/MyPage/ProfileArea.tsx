import React, { useCallback } from 'react';
import styled from 'styled-components';
import ShareIcon from '@src/assets/share.svg';
import ProfileImageArea from '../../Molecules/MyPage/ProfileImageArea';
import ProfileInfoArea from '@src/components/Molecules/MyPage/ProfileInfoArea';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
const ProfileArea = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleDownload = useCallback(async () => {
    const element = cardRef.current;
    const canvas = await html2canvas(element!, { allowTaint: true, useCORS: true });
    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'doit-profile.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  }, []);
  return (
    <Container ref={cardRef}>
      <IconArea onClick={handleDownload}>
        <ShareIcon style={{ color: 'red', marginLeft: 'auto', cursor: 'pointer' }} />
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
