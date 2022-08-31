import Card from '@src/components/Molecules/Board/Card';
import ContentBox from '@src/components/Molecules/ContentBox';
import { useMainPageBoard } from '@src/hooks/useBoards';
import { IBoard } from '@src/typings/Board';
import React from 'react';
import styled from 'styled-components';
const MainBoard = () => {
  const { data: MainBoards } = useMainPageBoard();
  return (
    <ContentBox title={'📘 최신 아티클'} requiredHeader to={'/community'}>
      <Container>
        {MainBoards?.map((b: IBoard, i: number) => (
          <Card
            board={b}
            key={i}
            category={null}
            search={''}
            isBookmark={false}
            isHome={true}
          />
        ))}
      </Container>
    </ContentBox>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, max-content));
  @media (min-width: 1920px) {
    grid-template-columns: repeat(2, minmax(400px, max-content));
  }
  justify-content: center;
  row-gap: 30px;
  column-gap: 30px;
  width: 100%;
  height: 100%;
`;
export default MainBoard;
