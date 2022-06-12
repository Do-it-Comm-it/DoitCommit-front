import { searchAtom } from '@src/recoil/atom/search';
import React, { useState, MouseEvent } from 'react';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import styled, { useTheme } from 'styled-components';
import DIInput from '../Atoms/DIInput';
import Tags from './Board/Tags';
import HeaderSearch from '@src/assets/header-search.svg';

type Props = {
  onClose: () => void;
};

const SearchBox = ({ onClose }: Props) => {
  const theme = useTheme();
  const [target, setTarget] = useState<EventTarget>();
  const [search, setSearch] = useRecoilState(searchAtom);

  const onSaveCurrentTarget = useCallback((event: MouseEvent) => {
    if (event.target) {
      setTarget(event.target);
    }
  }, []);

  const onChange = useCallback(
    (text) => {
      setSearch({ search: text, complete: false });
    },
    [setSearch]
  );
  const onChangeCategory = useCallback(
    (categoryId) => {
      setSearch((prev) => ({ ...prev, tag: categoryId }));
    },
    [setSearch]
  );

  const onEnter = useCallback(() => {
    onClose();
    setSearch((prev) => ({ ...prev, complete: true }));
  }, [setSearch, onClose]);

  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
        if (target === e.currentTarget) {
          onClose();
          setSearch((prev) => ({ ...prev, complete: true }));
        }
      }}
      onMouseDown={onSaveCurrentTarget}
    >
      <SearchContainer
        onMouseDown={onSaveCurrentTarget}
        onMouseUp={onSaveCurrentTarget}
      >
        <InputContainer>
          <Search />
          <DIInput
            defaultValue={search.search}
            placeholder="무엇을 찾으시나요?"
            onChange={onChange}
            onEnter={onEnter}
            hasBorder
            width={840}
            height={50}
            backgroundColor={theme.colors.white}
          />
        </InputContainer>

        <Line />
        <Tags onChangeCategory={onChangeCategory} category={search.tag} />
      </SearchContainer>
    </Container>
  );
};

const Container = styled.div`
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
  position: fixed;
  z-index: 9999;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: 350px;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.white};

  box-shadow: '0px 0px 12px rgba(0, 0, 0, 0.1)';
`;
const Line = styled.div`
  margin: 36px 0px;
  width: 840px;

  border: ${({ theme }) => `1px solid ${theme.colors.gray.gray400}`};
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;
`;
const Search = styled(HeaderSearch)``;
export default SearchBox;
