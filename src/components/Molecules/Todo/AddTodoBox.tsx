import React from 'react';
import styled from 'styled-components';
import { HiOutlinePlus } from 'react-icons/hi';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';
const AddTodoBox = () => {
  const [modal, setModal] = useRecoilState(modalAtom);
  return (
    <Container>
      <PlusIcon size={40} onClick={() => setModal({ id: 'todo', visible: true })} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 386px;
  min-height: 330px;
  width: 100%;

  background: #f9f9f9;

  box-shadow: 0px 0px 20px rgba(143, 146, 148, 0.1);
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;
const PlusIcon = styled(HiOutlinePlus)`
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
export default AddTodoBox;
