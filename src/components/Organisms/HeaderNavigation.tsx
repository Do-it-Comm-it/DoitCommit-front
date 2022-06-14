import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Navigation from '../Molecules/Navigation';
import UserProfile from '../Molecules/UserProfile';
import UserIcon from '@src/assets/user.svg';
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

const HeaderNavigation = () => {
  const { data: user } = useUser();
  const setModal = useSetRecoilState(modalAtom);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [open, setOpen] = useRecoilState(sidebarAtom);

  const onToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  const onClickSearch = useCallback(() => {
    setOpenSearch((prev) => !prev);
  }, []);

  return (
    <>
      <Navigation position={'top'}>
        <ExpandIcon open={open} onClick={onToggle} />
        <RightArea>
          <Search onClick={onClickSearch} />
          <Bell />
          <BookMark />
          {!user && (
            <Content>
              <UserIcon
                width={54}
                height={54}
                onClick={() => setModal({ id: 'login', visible: true })}
              />
            </Content>
          )}
          {user && (
            <Content>
              <UserProfile user={user} isMenuEnable />
            </Content>
          )}
        </RightArea>
      </Navigation>
      {openSearch && <SearchBox onClose={onClickSearch} />}
    </>
  );
};

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
  cursor: pointer;
`;
export default HeaderNavigation;
