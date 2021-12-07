import React from 'react';
import styled from 'styled-components';
import ExpandIcon from '@src/assets/메뉴확장.svg';
import { IUser } from '@src/typings/User';
import UserProfile from './UserProfile';
import Profile from '@src/assets/user.svg';
import { useAuthentication } from '@src/hooks/useAuthentication';

interface Props {
  open: boolean;
  user: IUser | null;
}
const SidebarTop = ({ open }: Props) => {
  const { user } = useAuthentication();
  return (
    <>
      <SidebarTopWrapper open={open}>
        <ExpandIcon />
        <ImageContainer>
          <div>{user ? <UserProfile width={49} height={49} user={user} /> : <Profile />}</div>
        </ImageContainer>
      </SidebarTopWrapper>
    </>
  );
};

const SidebarTopWrapper = styled.div<{ open: boolean }>`
  height: 258px;
  position: relative;
  padding: ${(props) => (props.open ? '21px 1px' : '21px 27px')};
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    position: absolute;
    width: 80%;
    height: 1px;
    background-color: #8f9294;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  & > h2 {
    ${(props) =>
      props.open && {
        position: 'absolute',
        top: 21,
        left: 27,
      }}
  }
  & > svg {
    ${(props) =>
      props.open && {
        position: 'absolute',
        top: 30,
        right: 30,
      }}
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    position: absolute;
    top: 100px;
  }
`;

export default SidebarTop;
