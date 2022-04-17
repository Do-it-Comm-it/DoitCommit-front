import Card from '@src/components/Molecules/Board/Card';
import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import { useBoards } from '@src/hooks/useBoards';
import { IBoard } from '@src/typings/Board';
import DIText from '@src/components/Atoms/DIText';
import LottieLoading from '@src/components/Atoms/LottieLoading';
import LottieError from '@src/components/Atoms/LottieError';
const CardContainer = () => {
  const theme = useTheme();
  const [active, setActive] = useState({
    newest: true,
    bookmark: false,
  });
  const {
    boards,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useBoards(2);

  if (isLoading) return <LottieLoading />;
  if (isError)
    return <LottieError errorMessage={'게시글을 불러오는데 실패했습니다!'} />;
  return (
    <InfiniteScroll
      hasMore={hasNextPage}
      loadMore={fetchNextPage as any}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <FilterContainer>
        <DIText
          fontColor={theme.colors.gray.gray950}
          fontWeight={500}
          fontSize={20}
        >
          최신 아티클을 둘러보세요
        </DIText>
        <ButtonWrapper>
          <FilterButton
            active={active.newest}
            onClick={() => setActive({ bookmark: false, newest: true })}
          >
            최신
          </FilterButton>
          <FilterButton
            active={active.bookmark}
            onClick={() => setActive({ newest: false, bookmark: true })}
          >
            북마크
          </FilterButton>
        </ButtonWrapper>
      </FilterContainer>
      <Container>
        {boards?.pages.map((page) =>
          page.data.map((b: IBoard, i: number) => <Card board={b} key={i} />)
        )}
        {isFetchingNextPage && <p>Loading..</p>}
      </Container>
    </InfiniteScroll>
  );
};

export default CardContainer;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, max-content));
  @media (min-width: 1920px) {
    grid-template-columns: repeat(4, minmax(400px, max-content));
  }
  justify-content: center;
  row-gap: 30px;
  column-gap: 30px;
  width: 100%;
  height: 100%;
`;
const FilterContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  max-width: 800px;
  flex-direction: row;
  margin-top: 1rem;
  margin-bottom: 1rem;

  & > span {
    line-height: 15px;
  }
`;
const ButtonWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const FilterButton = styled.li<{ active: boolean }>`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray.gray950};
  list-style: ${({ active }) => !active && 'none'};
  &::marker {
    color: ${({ theme }) => theme.colors.primary.default};
  }
`;
