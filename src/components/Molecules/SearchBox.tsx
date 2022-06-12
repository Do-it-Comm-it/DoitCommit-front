import { searchAtom } from '@src/recoil/atom/search';
import React, { useState, MouseEvent } from 'react';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import styled, { useTheme } from 'styled-components';
import DIInput from '../Atoms/DIInput';

type Props = {
  onClose: () => void;
};

const SearchBox = ({ onClose }: Props) => {
  const [target, setTarget] = useState<EventTarget>();

  const onSaveCurrentTarget = useCallback((event: MouseEvent) => {
    if (event.target) {
      setTarget(event.target);
    }
  }, []);

  const [search, setSearch] = useRecoilState(searchAtom);
  const theme = useTheme();
  const onChange = useCallback(
    (text) => {
      setSearch({ search: text, tag: null });
    },
    [setSearch]
  );

  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
        if (target === e.currentTarget) {
          onClose();
        }
      }}
      onMouseDown={onSaveCurrentTarget}
    >
      <SearchContainer
        onMouseDown={onSaveCurrentTarget}
        onMouseUp={onSaveCurrentTarget}
      >
        <DIInput
          defaultValue={search.search}
          placeholder="무엇을 찾으시나요?"
          onChange={onChange}
          hasBorder
          width={840}
          height={50}
          backgroundColor={theme.colors.white}
        />
        <Line />
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
  margin-top: 36px;
  width: 840px;

  border: ${({ theme }) => `1px solid ${theme.colors.gray.gray400}`};
`;
export default SearchBox;
