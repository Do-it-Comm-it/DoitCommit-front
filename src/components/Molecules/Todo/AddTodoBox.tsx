import React from 'react';
import styled from 'styled-components';
import { HiOutlinePlus } from 'react-icons/hi';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';
import { devices } from '@src/utils/theme';
const AddTodoBox = () => {
  const [, setModal] = useRecoilState(modalAtom);
  return (
    <Container onClick={() => setModal({ id: 'todo', visible: true })}>
      <PlusIcon size={40} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 286px;
  min-height: 330px;
  width: 100%;

  background: ${({ theme }) => theme.colors.background};

  box-shadow: 0px 0px 20px rgba(143, 146, 148, 0.1);
  border-radius: 10px;

  @media ${devices.laptop} {
    max-width: 386px;
  }

  @media ${devices.tablet} {
    max-width: 100%;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`;
const PlusIcon = styled(HiOutlinePlus)`
  color: ${({ theme }) => theme.colors.dark.a7};
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
export default AddTodoBox;
