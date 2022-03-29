import Card from '@src/components/Molecules/Board/Card';
import React from 'react';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import { useBoards } from '@src/hooks/useBoards';
import { IBoard } from '@src/typings/Board';
const CardContainer = () => {
  const { boards, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = useBoards();

  if (isLoading) return <div>Loading..</div>;
  if (isError) return <h2>Error!</h2>;
  return (
    <InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage as any} style={{ width: '100%', height: '100%' }}>
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
  row-gap: 5ch;
  width: 100%;
  height: 100%;
`;
