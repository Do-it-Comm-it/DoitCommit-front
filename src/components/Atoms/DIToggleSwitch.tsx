import React from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface Props {
  value: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}
const ToggleSwitch = ({ value = false, onChange, name }: Props) => {
  return (
    <CheckboxContainer>
      <CheckBox id="checkbox" type="checkbox" checked={value} onChange={onChange} name={name} />
      <CheckboxLabel htmlFor="checkbox" />
    </CheckboxContainer>
  );
};

export default ToggleSwitch;

const CheckboxContainer = styled.div`
  position: relative;
`;

const CheckboxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 25px;
  border-radius: 46px;
  background-color: #dadada;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 50px;
  height: 25px;
  &:checked + ${CheckboxLabel} {
    background: ${({ theme }) => theme.colors.primary.default};
    &::after {
      content: '';
      display: block;
      border-radius: 46px;
      width: 18px;
      height: 18px;
      margin-left: 29px;
      transition: 0.2s;
    }
  }
`;
