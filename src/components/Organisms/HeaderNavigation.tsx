import { AiOutlineBell } from 'react-icons/ai';
import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Navigation from '../Molecules/Navigation';
import SearchBar from '../Molecules/SearchBar';
import UserProfile from '../Molecules/UserProfile';
import UserIcon from '@src/assets/user.svg';
import { useCallback } from 'react';
import { modalAtom } from '@src/recoil/atom/modal';
import ExpandIconSVG from '@src/assets/expand.svg';
import { devices } from '@src/utils/theme';
import { sidebarAtom } from '@src/recoil/atom/sidebar';
import { useUser } from '@src/hooks/useAuthentication';
import { BsBookmark } from 'react-icons/bs';

const HeaderNavigation = () => {
  const { data: user } = useUser();
  const setModal = useSetRecoilState(modalAtom);
  const [open, setOpen] = useRecoilState(sidebarAtom);
  const onClickLogin = useCallback(() => {
    setModal({ id: 'login', visible: true });
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
            <Bell size={20} />
            <BookMark size={15} />
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
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  & > * {
    margin-right: 20px;
  }

  & > span {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.dark.a7};
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

const Bell = styled(AiOutlineBell)`
  color: ${({ theme }) => theme.colors.dark.a7};
`;

const BookMark = styled(BsBookmark)`
  color: ${({ theme }) => theme.colors.dark.a7};
`;
export default HeaderNavigation;
