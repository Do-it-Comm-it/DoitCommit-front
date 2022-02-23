import React from 'react';
import styled from 'styled-components';
import { HiOutlinePlus } from 'react-icons/hi';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';
import { useUser } from '@src/hooks/useAuthentication';

const AddPlannerBox = () => {
  const { data: user } = useUser();
  const [, setModal] = useRecoilState(modalAtom);
  return (
    <Container onClick={() => setModal({ id: user ? 'none' : 'login', visible: true })}>
      <PlusIcon size={40} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 187px;
  min-height: 161px;

  background: ${({ theme }) => theme.colors.background};

  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 10px;

  @media (max-width: ${1295}px) {
    width: 100%;
    margin: 10px;
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
export default AddPlannerBox;
