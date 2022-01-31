import { Content, Label, Input } from '@src/components/Atoms/Mypage';
import { IUser } from '@src/typings/User';
import React from 'react';

interface Props {
  name: string;
  label: string;
  user: IUser;
  onChange?: (e: any) => void;
}
const Form = ({ name, label, onChange, user }: Props) => {
  return (
    <Content>
      <Label>{label}</Label>
      <Input name={name} onChange={onChange} defaultValue={(user as any)[name]} />
    </Content>
  );
};

export default Form;
