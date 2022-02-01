import DIButton from '@src/components/Atoms/DIButton';
import { Content, Label } from '@src/components/Atoms/Mypage';
import SelectInput from '@src/components/Organisms/SelectInput';
import infoFormData from '@src/data/formData';
import { fileAtom } from '@src/recoil/atom/file';
import { techState, userAtom } from '@src/recoil/atom/user';
import { updateUserInfo } from '@src/service/api';
import { Tech } from '@src/typings/Tech';
import React, { useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import AddInput from './AddInput';
import Form from './Form';

const ProfileInfoArea = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [techList, setTechList] = useRecoilState(techState);
  const [formData, setFormData] = useState<{ name: string; label: string }[]>(infoFormData);
  const file = useRecoilValue(fileAtom);
  const [input, setInput] = useState({
    nickname: user?.nickname,
    email: user?.email,
    githubUrl: user?.githubUrl,
    position: user?.position,
    url1: user?.url1,
  });
  const onChangeInput = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInput({
        ...input,
        [name]: value,
      });
    },
    [input],
  );
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
    const updateInfo = { ...input, interestTechSet: techList, file: file.image };
    const result = await updateUserInfo(user!, updateInfo);
    if (result === 1) {
      alert('수정 되었습니다!');
      window.location.reload();
    }
  }, [input, techList, user, file]);
  return (
    <Container>
      {formData.map((item, i) => (
        <Form name={item.name} label={item.label} onChange={onChangeInput} key={i} user={user!} />
      ))}
      <Content>
        <Label>관심기술</Label>
        <SelectInput
          onChange={(value) => setTechList((value as Tech[]).map((tech: Tech) => tech.value))}
          value={techList as Tech[]}
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
