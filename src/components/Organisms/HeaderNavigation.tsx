import { userAtom } from '@src/recoil/atom/user';
import { AiOutlineBell } from 'react-icons/ai';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Navigation from '../Molecules/Navigation';
import SearchBar from '../Molecules/SearchBar';
import UserProfile from '../Molecules/UserProfile';
import UserIcon from '@src/assets/user.svg';
import { useCallback } from 'react';
import { modalAtom } from '@src/recoil/atom/modal';
import useAuthentication from '@src/hooks/useAuthentication';

const HeaderNavigation = () => {
  const { logout } = useAuthentication();
  const user = useRecoilValue(userAtom);
  const setModal = useSetRecoilState(modalAtom);
  const onClickLogin = useCallback(() => {
    setModal({ id: 'login', visible: true });
  }, [setModal]);

  return (
    <Navigation position={'top'}>
      <RightArea></RightArea>

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
export default HeaderNavigation;
