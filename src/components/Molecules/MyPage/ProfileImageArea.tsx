import { userAtom } from '@src/recoil/atom/user';
import React, { useRef, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import EditIconSVG from '@src/assets/edit.svg';
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
    <>
      {user && (
        <Container>
          <ProfileImage src={user?.image!} alt="Error!" />
          <input type="file" ref={hiddenFileInput} onChange={onFileChange} style={{ display: 'none' }} />
          <EditIcon onClick={onUpload} />
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
`;
const ProfileImage = styled.img`
  width: 245px;
  height: 245px;
  border-radius: 100%;
`;
const EditIcon = styled(EditIconSVG)`
  position: absolute;
  bottom: 0;
  right: 155px;
  cursor: pointer;
`;

export default ProfileImageArea;
