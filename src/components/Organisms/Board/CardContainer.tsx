import Card from '@src/components/Molecules/Board/Card';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import { useBoards } from '@src/hooks/useBoards';
import { IBoard } from '@src/typings/Board';
import DIText from '@src/components/Atoms/DIText';
const CardContainer = () => {
  const theme = useTheme();
  const { boards, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = useBoards();

  if (isLoading) return <div>Loading..</div>;
  if (isError) return <h2>Error!</h2>;
  return (
    <InfiniteScroll
      hasMore={hasNextPage}
      loadMore={fetchNextPage as any}
      style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <FilterContainer>
        <DIText fontColor={theme.colors.dark.a7} fontWeight={500} fontSize={20}>
          최신 아티클을 둘러보세요
        </DIText>
        <ButtonWrapper>
          <span>최신</span>
          <span>북마크</span>
        </ButtonWrapper>
      </FilterContainer>
      <Container>
        {boards?.pages.map((page) => page.data.map((b: IBoard, i: number) => <Card board={b} key={i} />))}
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
  width: 100%;
  justify-content: space-around;
  flex-direction: row;
  margin-top: 1rem;
  margin-bottom: 1rem;

  & > span {
    line-height: 15px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;

  & > span {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.dark.a7};
  }
`;
