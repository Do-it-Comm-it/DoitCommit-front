import { Content, Label, Input } from '@src/components/Atoms/Mypage';
import { userFormState } from '@src/recoil/atom/user';
import { IUser } from '@src/typings/User';
import React from 'react';
import { useRecoilState } from 'recoil';

interface Props {
  name: string;
  label: string;
  user: IUser;
}
const Form = ({ name, label, user }: Props) => {
  const [input, setInput] = useRecoilState(userFormState(name));
  return (
    <Content>
      <Label>{label}</Label>
      <Input name={name} onChange={(e) => setInput(e.target.value)} defaultValue={(user as any)[name]} />
    </Content>
  );
};

export default Form;
