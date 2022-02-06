import React, { useRef, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import EditIconSVG from '@src/assets/edit.svg';
import ProfileIconSVG from '@src/assets/user.svg';
import DIText from '@src/components/Atoms/DIText';
import { devices } from '@src/utils/theme';
import { fileAtom } from '@src/recoil/atom/file';
import { useUser } from '@src/hooks/useAuthentication';
const ProfileImageArea = () => {
  const { data: user } = useUser();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useRecoilState(fileAtom);
  const onUpload = useCallback(() => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  }, [hiddenFileInput]);
  const onFileChange = useCallback(
    (event) => {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.onload = () => {
        setFile({
          image: file,
          previewUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
    },
    [setFile],
  );

  return (
    <Container>
      <DIText fontColor="#18171c" fontWeight={500} fontSize={25} style={{ marginBottom: '20px' }}>
        프로필 설정
      </DIText>
      <input type="file" ref={hiddenFileInput} onChange={onFileChange} style={{ display: 'none' }} />
      <ImageWrapper>
        {user?.pictureUrl ? (
          <ProfileImage src={file.previewUrl || user?.pictureUrl} alt="Error!" />
        ) : (
          <ProfileIconSVG width={238} height={238} />
        )}
        <EditIcon onClick={onUpload} />
      </ImageWrapper>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 60px;
  @media ${devices.tablet} {
    align-items: center;
  }
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
