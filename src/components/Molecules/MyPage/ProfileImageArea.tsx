import { userAtom } from '@src/recoil/atom/user';
import React, { useRef, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import EditIconSVG from '@src/assets/edit.svg';
import ProfileIconSVG from '@src/assets/user.svg';
import DIText from '@src/components/Atoms/DIText';
const ProfileImageArea = () => {
  const user = useRecoilValue(userAtom);
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const onUpload = useCallback(() => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  }, [hiddenFileInput]);
  const onFileChange = useCallback((e) => {
    const fileUploaded = e.target.files[0];
    console.log(fileUploaded);
    // setImage(fileUploaded);
    //set file upload here
  }, []);

  return (
    <Container>
      <DIText fontColor="#18171c" fontWeight={500} fontSize={25} style={{ marginBottom: '20px' }}>
        프로필 설정
      </DIText>
      <ImageWrapper>
        {user?.pictureUrl ? (
          <ProfileImage src={user?.pictureUrl!} alt="Error!" />
        ) : (
          <ProfileIconSVG width={238} height={238} />
        )}
        <EditIcon />
      </ImageWrapper>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 60px;
`;
const ProfileImage = styled.img`
  width: 245px;
  height: 245px;
  border-radius: 100%;
`;
const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const EditIcon = styled(EditIconSVG)`
  position: absolute;
  bottom: 0;
  right: 50px;
  cursor: pointer;
`;

export default ProfileImageArea;
