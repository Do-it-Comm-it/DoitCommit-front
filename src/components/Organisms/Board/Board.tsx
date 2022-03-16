import BoardContent from '@src/components/Molecules/Board/BoardContent';
import BoardHeader from '@src/components/Molecules/Board/BoardHeader';
import { getBoardData } from '@src/service/api';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import styled from 'styled-components';

interface ParamType {
  id: string;
}
const Board = () => {
  const { id }: ParamType = useParams();
  const { data: boardData, isLoading } = useQuery('board', async () => await getBoardData(id), {
    retry: 1,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);
  if (isLoading) return <p>Loading..</p>;
  return (
    <Container>
      <BoardHeader boardData={boardData!} />
      <BoardContent boardData={boardData!} />
    </Container>
  );
};

export default Board;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 44rem;
  width: 100%;
`;
