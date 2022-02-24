import React, { ChangeEvent, useCallback } from 'react';
import styled from 'styled-components';
import Search from '@src/assets/search.svg';
import { devices } from '@src/utils/theme';
import { useSetRecoilState } from 'recoil';
import keywordAtom from '@src/recoil/atom/keyword';

const SearchBar = () => {
  const setKeyword = useSetRecoilState(keywordAtom);
  const onChangeKeyword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    },
    [setKeyword],
  );
  return (
    <Container>
      <Input placeholder="검색어를 입력 해 주세요." onChange={onChangeKeyword} />
      <SearchIcon width={38} height={38} />
    </Container>
  );
};

export default SearchBar;

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 656px;
  display: flex;
  align-items: center;
  @media ${devices.tablet} {
    width: 100%;
  }
`;

const Input = styled.input`
  max-width: 656px;
  height: 86px;
  outline: none;
  width: 100%;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.boxShadow};
  color: ${({ theme }) => theme.colors.main};
  padding-left: 5%;
  font-size: 25px;
  font-weight: 400;
  &::placeholder {
    color: ${({ theme }) => theme.colors.dark.a3};
    font-size: 25px;
    font-weight: 400;
  }
`;
const SearchIcon = styled(Search)`
  position: absolute;
  top: 25px;
  right: 35px;
  cursor: pointer;
  & > path {
    fill: ${({ theme }) => theme.colors.dark.a7};
  }
`;
