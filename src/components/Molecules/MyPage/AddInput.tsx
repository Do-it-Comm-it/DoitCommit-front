import React from 'react';
import styled from 'styled-components';
import PlusIconSVG from '@src/assets/plus.svg';

interface Props {
  onClick: () => void;
}
const AddInput = ({ onClick }: Props) => {
  return (
    <Button onClick={onClick}>
      <PlusIcon />
    </Button>
  );
};

export default AddInput;

const Button = styled.button`
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(143, 146, 148, 0.1);
  border-radius: 10px;
  width: 54px;
  height: 54px;
  border: none;
  cursor: pointer;
`;

const PlusIcon = styled(PlusIconSVG)``;
