import Card from '@src/components/Molecules/Board/Card';
import { useBoards } from '@src/hooks/useBoards';
import React from 'react';
import styled from 'styled-components';

const CardContainer = () => {
  const { data: boards, isLoading } = useBoards();

  if (isLoading) return <div>Loading..</div>;
  return (
    <React.Suspense fallback={<div>Boards...</div>}>
      <Container>
        {boards.map((b: any, i: number) => (
          <Card board={b} key={i} />
        ))}
      </Container>
    </React.Suspense>
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
