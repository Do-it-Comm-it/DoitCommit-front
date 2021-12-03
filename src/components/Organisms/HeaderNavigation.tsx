import useDarkMode from '@src/hooks/useDarkMode';
import { userAtom } from '@src/recoil/atom/user';
import React, { useState } from 'react';
import { AiOutlineBell } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import DIText from '../Atoms/DIText';
import Navigation from '../Molecules/Navigation';
import SearchBar from '../Molecules/SearchBar';
import UserProfile from '../Molecules/UserProfile';
import ThemeToggle from './ThemeToggle';

const HeaderNavigation = () => {
  const user = useRecoilValue(userAtom);

  return (
    <Navigation position={'top'}>
      <RightArea>
        <DIText>{'DO it Commit!'}</DIText>
      </RightArea>

      <LeftArea>
        <SearchBar />
        <AiOutlineBell size={20} />
        <UserProfile user={user} />
        <ThemeToggle />
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

export default HeaderNavigation;
