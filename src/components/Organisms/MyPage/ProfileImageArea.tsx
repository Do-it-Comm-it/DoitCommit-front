import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';
import UserIcon from '@src/assets/user.svg';
import EditIcon from '@src/assets/edit.svg';
const ProfileImageArea = () => {
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
      <UserIcon width={284} height={284} />
      <EditWrapper>
        <CircleEditIcon />
        <MenuWrapper>
          <input ref={hiddenFileInput} style={{ display: 'none' }} type="file" onChange={onFileChange} />
          <span onClick={onUpload}>업로드</span>
          <span>|</span>
          <span>삭제</span>
        </MenuWrapper>
      </EditWrapper>
    </Container>
  );
};
const Container = styled.div`
  position: relative;
`;
const EditWrapper = styled.div`
  position: absolute;
  left: 10px;
  bottom: 17px;
  overflow: hidden;
  white-space: nowrap;
  width: 44px;
  height: 44px;
  border-radius: 54px;
  background-color: rgba(53, 53, 53, 0.85);

  &:hover {
    width: 180px;
    transition: width 0.5s;
  }
  &:not(:hover) {
    transition: width 0.5s;
  }
`;
const CircleEditIcon = styled(EditIcon)`
  background-color: #353535;
  width: 44px;
  height: 44px;
  border-radius: 54px;
  vertical-align: middle;
  padding-left: 11px;
  padding-top: 11px;
`;
const MenuWrapper = styled.span`
  margin-left: 16px;
  height: 100%;
  width: 100%;
  vertical-align: middle;
  & > span {
    color: #ffffff;
    font-weight: 400;
    font-size: 16px;
    margin-right: 10px;
    user-select: none;
    cursor: pointer;
  }
`;
export default ProfileImageArea;
