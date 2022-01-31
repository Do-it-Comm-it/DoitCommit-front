import { IUser } from '@src/typings/User';
import React from 'react';
import styled from 'styled-components';

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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 25px;
`;

const Label = styled.label`
  color: #8f9294;
  font-size: 20px;
  font-weight: 500;
  white-space: nowrap;
  padding-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  height: 59px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(143, 146, 148, 0.1);
  outline: none;
  border: none;
  padding-left: 15px;
`;
