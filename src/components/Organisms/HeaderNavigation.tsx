import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Navigation from '../Molecules/Navigation';
import UserProfile from '../Molecules/UserProfile';
import { useCallback } from 'react';
import { modalAtom } from '@src/recoil/atom/modal';
import ExpandIconSVG from '@src/assets/expand.svg';
import { devices } from '@src/utils/theme';
import { sidebarAtom } from '@src/recoil/atom/sidebar';
import { useUser } from '@src/hooks/useAuthentication';
import HeaderAlarm from '@src/assets/header-alarm.svg';
import HeaderBookmark from '@src/assets/header-bookmark.svg';
import HeaderSearch from '@src/assets/header-search.svg';
import SearchBox from '../Molecules/SearchBox';
import LogoSvg from '@src/assets/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import myBoardAtom from '@src/recoil/atom/myBoard';
const HeaderNavigation = () => {
  const { data: user } = useUser();
  const location = useLocation();
  const setModal = useSetRecoilState(modalAtom);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [open, setOpen] = useRecoilState(sidebarAtom);
  const [myBoard, setMyBoard] = useRecoilState(myBoardAtom);
  const onToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  const onClickSearch = useCallback(() => {
    setOpenSearch((prev) => !prev);
  }, []);

  const onBookMarkToggle = useCallback(() => {
    // 아티클 메인 페이지에서만 북마크 리스트를 조회할 수 있도록한다.
    if (location.pathname === '/community') {
      if (myBoard.history) {
        setMyBoard({ bookmark: false, history: false });
      } else {
        setMyBoard({ bookmark: !myBoard.bookmark, history: false });
      }
    }
  }, [setMyBoard, myBoard, location]);

  return (
    <>
      <Navigation position={'top'}>
        <ExpandIcon open={open} onClick={onToggle} />
        <LeftArea>
          <Items>
            <RouterLink to={'/'}>
              <Logo />
            </RouterLink>
          </Items>
          <Items>두잇</Items>
          <Items>
            <RouterLink to={'/community'}>아티클</RouterLink>
          </Items>
        </LeftArea>
        <RightArea>
          <Search onClick={onClickSearch} />
          {!user && (
            <Content onClick={() => setModal({ id: 'login', visible: true })}>
              로그인
            </Content>
          )}
          {user && (
            <>
              <Bell />
              <BookMark onClick={onBookMarkToggle} />
              <Content>
                <UserProfile user={user} isMenuEnable />
              </Content>
            </>
          )}
        </RightArea>
      </Navigation>
      {openSearch && <SearchBox onClose={onClickSearch} />}
    </>
  );
};

const LeftArea = styled.div`
  display: flex;
  align-items: center;
  & > nav {
    &:first-child {
      border-radius: 10px;
      padding: 8px;
      background-color: ${({ theme }) => theme.colors.primary.default};
      margin-right: 30px;
    }
    &:not(first-child) {
      margin-left: 8px;
      cursor: pointer;
    }
  }
`;

const Items = styled.nav`
  color: ${({ theme }) => theme.colors.gray.gray950};
`;

const Logo = styled(LogoSvg)``;

const RouterLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gray.gray950};
`;

const RightArea = styled.div`
  display: flex;
  margin-left: auto;
  flex-direction: row;
  align-items: center;
  gap: 35px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray.gray950};
  @media ${devices.tablet} {
    margin-left: auto;
  }
  & > * {
    margin-right: 20px;
  }

  & > span {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray.gray950};
    margin-right: auto;
    padding: 0 20px;
    cursor: pointer;
  }
`;

const ExpandIcon = styled(ExpandIconSVG)<{ open: boolean }>`
  display: none;
  & > path {
    fill: ${({ theme }) => theme.colors.gray.gray950};
  }

  cursor: pointer;
  @media ${devices.laptop} {
    display: flex;
  }
`;

const Bell = styled(HeaderAlarm)`
  cursor: pointer;
`;
const BookMark = styled(HeaderBookmark)`
  cursor: pointer;
`;
const Search = styled(HeaderSearch)`
  & > path {
    fill: ${({ theme }) => theme.colors.gray.gray950};
  }
  cursor: pointer;
`;
export default HeaderNavigation;
