import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import DIInput from '../Atoms/DIInput';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDebounce } from '@src/hooks/useDebounce';

const SearchBar = ({ width = 230, height = 25, defaultValue = '' }) => {
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
      {!isFocused && <SearchIcon size={20} />}
      <DIInput
        defaultValue={value}
        width={width}
        height={height}
        onChange={onChange}
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
const SearchIcon = styled(AiOutlineSearch)`
  position: absolute;
  top: 4px;
  left: 6px;
`;
const Contanier = styled.div`
  position: relative;
`;

export default SearchBar;
