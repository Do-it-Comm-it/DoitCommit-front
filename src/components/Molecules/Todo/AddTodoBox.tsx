import React from 'react';
import styled from 'styled-components';
import { HiOutlinePlus } from 'react-icons/hi';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';
import { devices } from '@src/utils/theme';

type Props = {
  requiredLogin?: boolean;
};

const AddTodoBox = ({ requiredLogin }: Props) => {
  const [, setModal] = useRecoilState(modalAtom);
  return (
    <Container
      onClick={() =>
        requiredLogin
          ? setModal({ id: 'login', visible: true })
          : setModal({ id: 'todo', visible: true })
      }
    >
      <PlusIcon size={40} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 286px;
  max-width: 385px;
  min-height: 330px;
  width: 100%;

  background: ${({ theme }) => theme.colors.gray.gray200};

  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 10px;

  @media ${devices.laptop} {
    max-width: 100%;
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
  color: ${({ theme }) => theme.colors.gray.gray950};
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
export default AddTodoBox;
