import DIButton from '@src/components/Atoms/DIButton';
import { Content, Label } from '@src/components/Atoms/Mypage';
import SelectInput from '@src/components/Organisms/SelectInput';
import infoFormData from '@src/data/formData';
import { fileAtom } from '@src/recoil/atom/file';
import { userAtom, userFormState } from '@src/recoil/atom/user';
import { updateUserInfo } from '@src/service/api';
import { Tech } from '@src/typings/Tech';
import React, { useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import AddInput from './AddInput';
import Form from './Form';

const ProfileInfoArea = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [techList, setTechList] = useRecoilState(userFormState('interestTechSet'));
  const [formData, setFormData] = useState<{ name: string; label: string }[]>(infoFormData);
  const file = useRecoilValue(fileAtom);
  const nickname = useRecoilValue(userFormState('nickname'));
  const email = useRecoilValue(userFormState('email'));
  const position = useRecoilValue(userFormState('position'));
  const githubUrl = useRecoilValue(userFormState('githubUrl'));
  const url1 = useRecoilValue(userFormState('url1'));
  const addForm = useCallback(() => {
    setFormData([
      ...formData,
      {
        label: 'url2',
        name: 'url2',
      },
    ]);
  }, [formData]);
  const onSubmit = useCallback(async () => {
    const input = {
      nickname,
      email,
      position,
      githubUrl,
      url1,
    };
    console.log(input);
    const updateInfo = { ...input, interestTechSet: techList, file: file.image };
    const result = await updateUserInfo(user!, updateInfo);
    if (result === 1) {
      alert('수정 되었습니다!');
      window.location.reload();
    }
  }, [url1, email, githubUrl, position, techList, user, file, nickname]);
  return (
    <Container>
      {formData.map((item, i) => (
        <Form name={item.name} label={item.label} key={i} user={user!} />
      ))}
      <Content>
        <Label>관심기술</Label>
        <SelectInput
          onChange={(value) => setTechList((value as Tech[]).map((tech: Tech) => tech.value))}
          value={techList}
        />
      </Content>
      <div>
        <AddInput onClick={addForm} />
      </div>
      <DIButton color="#fff" onClick={onSubmit} backgroundColor="#AACD06" borderRadius={51}>
        내 프로필 저장
      </DIButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 15px;

  & > button {
    margin: 20px 0;
    margin-left: auto;
  }
`;

export default ProfileInfoArea;
