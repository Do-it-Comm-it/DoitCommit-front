import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import DIInput from '../Atoms/DIInput';
import { useDebounce } from '@src/hooks/useDebounce';
import Search from '@src/assets/search.svg';

const SearchBar = ({ width = 230, height = 45, defaultValue = '' }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const debouncedKeyword = useDebounce(value, 250);

  useEffect(() => {
    if (debouncedKeyword) {
      //TODO: search API will be executed in here.
    }
  }, [debouncedKeyword]);

  const onChange = useCallback(
    (text) => {
      setValue(text);
    },
    [setValue],
  );

  return (
    <Contanier>
      {!isFocused && <SearchIcon width={24} height={24} />}
      <DIInput
        defaultValue={value}
        width={width}
        height={height}
        onChange={onChange}
        borderRadius={64}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />
    </Contanier>
  );
};
const SearchIcon = styled(Search)`
  position: absolute;
  top: 10px;
  left: 10px;
  & > path {
    fill: ${({ theme }) => theme.colors.dark.a7};
  }
`;
const Contanier = styled.div`
  position: relative;
`;

export default SearchBar;
