import { Content, Label, Input } from '@src/components/Atoms/Mypage';
import { IUser } from '@src/typings/User';
import React, { ChangeEvent } from 'react';

interface Props {
  name: string;
  label: string;
  user: IUser;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}
const Form = ({ name, label, user, onChangeInput }: Props) => {
  return (
    <Content>
      <Label>{label}</Label>
      <Input
        name={name}
        onChange={onChangeInput}
        defaultValue={(user as any)[name]}
      />
    </Content>
  );
};

export default React.memo(Form, (prev, next) => prev.name === next.name);
