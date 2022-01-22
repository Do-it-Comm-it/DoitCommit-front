import DIButton from '@src/components/Atoms/DIButton';
import infoFormData from '@src/data/formData';
import { userAtom } from '@src/recoil/atom/user';
import React, { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import AddInput from './AddInput';
import Form from './Form';
const ProfileInfoArea = () => {
  const user = useRecoilValue(userAtom);
  const [formData, setFormData] = useState(infoFormData);
  const [input, setInput] = useState({
    ...formData,
  });
  const onChangeInput = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInput({
        ...input,
        [name]: value,
      });
      console.log(name, value);
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
  // TODO : default value about registered user
  return (
    <Container>
      {formData.map((item, i) => (
        <Form name={item.name} label={item.label} onChange={onChangeInput} key={i} />
      ))}
      <div>
        <AddInput onClick={addForm} />
      </div>
      <DIButton color="#fff" onClick={() => {}} backgroundColor="#AACD06" borderRadius={51}>
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
