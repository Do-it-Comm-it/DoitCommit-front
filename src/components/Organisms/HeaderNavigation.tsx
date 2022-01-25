import { userAtom } from '@src/recoil/atom/user';
import { AiOutlineBell } from 'react-icons/ai';
import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Navigation from '../Molecules/Navigation';
import SearchBar from '../Molecules/SearchBar';
import UserProfile from '../Molecules/UserProfile';
import UserIcon from '@src/assets/user.svg';
import { useCallback } from 'react';
import { modalAtom } from '@src/recoil/atom/modal';
import useAuthentication from '@src/hooks/useAuthentication';
import ExpandIconSVG from '@src/assets/expand.svg';
import { devices } from '@src/utils/theme';
import { sidebarAtom } from '@src/recoil/atom/sidebar';
const HeaderNavigation = () => {
  const { logout } = useAuthentication();
  const user = useRecoilValue(userAtom);
  const setModal = useSetRecoilState(modalAtom);
  const [open, setOpen] = useRecoilState(sidebarAtom);
  const onClickLogin = useCallback(() => {
    setModal({ id: 'register', visible: true });
  }, [setModal]);

  const onToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);
  return (
    <Navigation position={'top'}>
      <RightArea></RightArea>

      <ExpandIcon open={open} onClick={onToggle} />
      <LeftArea>
        <SearchBarWrapper>
          <SearchBar />
        </SearchBarWrapper>
        {!user && (
          <Content>
            <span onClick={onClickLogin}>Login</span>
            <UserIcon width={54} height={54} />
          </Content>
        )}
        {user && (
          <Content>
            <AiOutlineBell size={20} />
            <span onClick={logout}>Logout</span>
            <UserProfile user={user} isMenuEnable />
          </Content>
        )}
      </LeftArea>
    </Navigation>
  );
};

const RightArea = styled.div`
  justify-self: flex-start;
`;
const LeftArea = styled.div`
  width: 430px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-left: auto;
`;
const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 70%;
  border-right: 1px solid #eaeaea;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  & > span {
    font-size: 16px;
    color: #18171c;
    margin-right: auto;
    padding: 0 20px;
    cursor: pointer;
  }
`;

const ExpandIcon = styled(ExpandIconSVG)<{ open: boolean }>`
  display: none;
  margin-right: auto;
  cursor: pointer;
  @media ${devices.laptop} {
    display: flex;
  }
`;
export default HeaderNavigation;
