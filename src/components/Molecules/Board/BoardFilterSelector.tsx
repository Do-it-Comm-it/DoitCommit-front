import styled from 'styled-components';
import OpenerSVG from '@src/assets/opener.svg';
import React, { useRef, useState } from 'react';
import useOutsideClick from '@src/hooks/useOutsideClick';

type Props = {
  filter: string;
  onChangeFilter: (filter: string) => void;
  onChangeBookmark?: (isBookmark: boolean) => void;
  active: boolean;
};

const BoardFilterSelector = ({
  filter,
  onChangeFilter,
  active,
  onChangeBookmark,
}: Props) => {
  const [isOpener, setIsOpener] = useState<boolean>(false);
  const filterRef = useRef<HTMLUListElement>(null);

  useOutsideClick(filterRef, () => setIsOpener(false));

  return (
    <ButtonWrapper ref={filterRef}>
      <FilterButton
        active={active}
        isClick={true}
        onClick={() => {
          if (onChangeBookmark) {
            onChangeBookmark(false);
          }
          setIsOpener((prev) => !prev);
        }}
      >
        {filter}
      </FilterButton>
      <FilterOpener
        isOpener={isOpener}
        onClick={() => {
          setIsOpener((prev) => !prev);
        }}
      />
      {isOpener && (
        <FilterWrap>
          {['최신순', '좋아요순', '조회수순'].map((FBoard: string) => (
            <Filter
              key={FBoard}
              isSelect={FBoard === filter}
              onClick={() => {
                onChangeFilter(FBoard);
                setIsOpener(false);
              }}
            >
              {FBoard}
            </Filter>
          ))}
        </FilterWrap>
      )}
    </ButtonWrapper>
  );
};

const Filter = styled.button<{ isSelect: boolean }>`
  width: 108px;
  height: 49px;
  background: ${({ isSelect }) => (isSelect ? '#F9F9F9' : '#FEFEFE')};
  border: 1px solid transparent;
  color: ${({ theme, isSelect }) =>
    isSelect ? theme.colors.primary.default : theme.colors.gray.gray950};
  cursor: pointer;
  &:first-child {
    border-radius: 10px 10px 0px 0px;
  }
  &:last-child {
    border-radius: 0px 0px 10px 10px;
  }
  z-index: 2;
`;

const ButtonWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const FilterWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 30px;
  right: 0;
  left: 8;
`;

const FilterButton = styled.li<{ active?: boolean; isClick?: boolean }>`
  color: ${({ theme }) => theme.colors.gray.gray950};
  list-style: ${({ active }) => !active && 'none'};
  &::marker {
    color: ${({ theme }) => theme.colors.primary.default};
  }
  cursor: ${({ isClick }) => (!isClick ? 'auto' : 'pointer')};
`;

const FilterOpener = styled(({ isOpener, ...props }) => (
  <OpenerSVG {...props} />
))<{ isOpener?: boolean }>`
  & > path {
    stroke: ${({ theme }) => theme.colors.primary.default};
  }
  cursor: pointer;
  ${({ isOpener }) =>
    isOpener ? `transform: rotate(-180deg)` : `transform: rotate(0deg)`};
`;

export default BoardFilterSelector;
