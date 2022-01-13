import { userAtom } from '@src/recoil/atom/user';
import React, { useCallback } from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import SelectInput from '../SelectInput';
type Tech = {
  value: string;
  label: string;
};
const PersonalSettings = () => {
  // TODO : default value about registered user
  // TODO : Refactoring input code
  const user = useRecoilValue(userAtom);
  const [tech, setTechList] = useState<Tech[]>([]);
  const [info, setInfo] = useState({
    nickname: '',
    position: '',
    github: '',
    url1: '',
    url2: '',
  });
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInfo({
        ...info,
        [name]: value,
      });
    },
    [info],
  );
  return (
    <Container>
      <Ul>
        <Li>
          <Label>이름 (별명)</Label>
          <Input name="nickname" onChange={onChange} defaultValue={user?.nickname!} />
        </Li>
        <Li>
          <Label>E-mail</Label>
          <Input name="email" onChange={onChange} />
        </Li>
        <Li>
          <Label>직군·직종</Label>
          <Input name="position" onChange={onChange} />
        </Li>
        <Li>
          <Label>Github</Label>
          <Input name="github" onChange={onChange} />
        </Li>
      </Ul>

      <Ul>
        <Li>
          <Label>관심기술</Label>
          <SelectInput width={100} onChange={(value) => setTechList(value as Tech[])} />
        </Li>

        <Li>
          <Label>URL</Label>
          <Input name="url1" onChange={onChange} />
        </Li>
        <Li>
          <Label>URL</Label>
          <Input name="url2" onChange={onChange} />
        </Li>
      </Ul>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;
const Ul = styled.ul`
  display: flex;
  justify-content: flex-start;
  width: 50%;
  flex-direction: column;
  padding: 50px;
`;

const Li = styled.li`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-bottom: 38px;
`;
const Input = styled.input`
  height: 55px;
  border: 0 none;
  background-color: #eeeeee;
  border-radius: 5px;
  padding: 6px 13px;
  width: 100%;
  outline: none;
  &:focus {
    box-shadow: 0px 0px 4px #aacd06;
    background: #ffffff;
    border: 1px solid #aacd06;
  }
`;
const Label = styled.label`
  color: #18171c;
  font-size: 17px;
  padding-bottom: 11px;
`;
export default PersonalSettings;
