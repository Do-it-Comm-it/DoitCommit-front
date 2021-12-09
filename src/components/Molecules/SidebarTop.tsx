import React from 'react';
import styled from 'styled-components';
import ExpandIcon from '@src/assets/메뉴확장.svg';
import { useAuthentication } from '@src/hooks/useAuthentication';
import { useSetRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';
import UserProfile from './UserProfile';

const SidebarTop = () => {
  const { user } = useAuthentication();
  const setModal = useSetRecoilState(modalAtom);
  return (
    <SidebarTopWrapper>
      <ExpandIcon />
      <Container>
        <div>{user && <UserProfile user={user} width={40} height={40} />}</div>
        {!user && <span onClick={() => setModal({ id: 'login', visible: true })}>로그인</span>}
      </Container>
    </SidebarTopWrapper>
  );
};

export const SidebarTopWrapper = styled.div`
  height: 150px;
  position: relative;
  padding: 21px 31px;
  margin-bottom: 15px;

  &::after {
    content: '';
    position: absolute;
    width: 80%;
    height: 1px;
    background-color: #66727a;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  white-space: nowrap;
  height: 100%;
  align-items: center;
  justify-content: center;

  & > span {
    color: #ffffff;
    font-size: 15px;
    cursor: pointer;
    margin-top: 50px;
  }
`;

export default SidebarTop;
