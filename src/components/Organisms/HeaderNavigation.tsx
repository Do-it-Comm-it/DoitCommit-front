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

  const onToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);
  return (
    <Navigation position={'top'}>
      <ExpandIcon open={open} onClick={onToggle} />

      <LeftArea>
        <SearchBarWrapper>
          <SearchBar />
        </SearchBarWrapper>
      </LeftArea>

      <RightArea>
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
            <Bell size={20} />
            <BookMark size={15} />
            <UserProfile user={user} isMenuEnable />
          </Content>
        )}
      </RightArea>
    </Navigation>
  );
};

const LeftArea = styled.div`
  justify-self: flex-start;
  margin-right: auto;
  margin-left: 40px;
`;
const RightArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;
const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 70%;
  @media ${devices.tablet} {
    display: none;
  }
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

const Bell = styled(AiOutlineBell)`
  color: ${({ theme }) => theme.colors.gray.gray950};
`;

const BookMark = styled(BsBookmark)`
  color: ${({ theme }) => theme.colors.gray.gray950};
`;
export default HeaderNavigation;
