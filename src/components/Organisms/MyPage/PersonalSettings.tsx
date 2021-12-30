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
  // TODO: defaultValue from User data
  // TODO: Documents Page. (Not fixed)
  // TODO: User resign action (need to implement user resign api)
  const user = useRecoilValue(userAtom);
  const [, setTechList] = useState<Tech[]>([]);
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
          <Label>닉네임</Label>
          <Input name="nickname" onChange={onChange} defaultValue={user?.nickname!} />
        </Li>
        <Li>
          <Label>직군</Label>
          <Input name="position" onChange={onChange} defaultValue={user?.position!} />
        </Li>
        <Li>
          <Label>관심 기술</Label>
          <SelectInput width={475} onChange={(value) => setTechList(value as Tech[])} />
        </Li>
      </Ul>

      <Ul>
        <Li>
          <Label>GITHUB</Label>
          <Input name="github" onChange={onChange} />
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
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;
const Ul = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Li = styled.li`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-bottom: 38px;
`;
const Input = styled.input`
  height: 50px;
  border: 0 none;
  background-color: #eeeeee;
  border-radius: 5px;
  padding: 6px 13px;
  width: 475px;
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
