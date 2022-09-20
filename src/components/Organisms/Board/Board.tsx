import LottieAnimation from '@src/components/Atoms/LottieAnimation';
import BoardContent from '@src/components/Molecules/Board/BoardContent';
import BoardHeader from '@src/components/Molecules/Board/BoardHeader';
import { board as boardAPI } from '@src/service/api';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import OtherBoard from './OtherBoard';

const Board = () => {
  const { id } = useParams();
  const { data: boardData, isLoading } = useQuery(
    `board/${id}`,
    async () => {
      if (id) {
        const result = await boardAPI.getBoardById(id);

        return result;
      }
    },
    {
      retry: 1,
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  console.log(boardData);

  if (isLoading) return <LottieAnimation type="loading" />;
  return (
    <Container>
      {boardData ? (
        <>
          <BoardHeader boardData={boardData} />
          <BoardContent boardData={boardData} />
          <OtherBoard memberId={3} />
        </>
      ) : (
        <>
          <LottieAnimation type="loading" />
          <ReloadText to={`/board/${id}`}>새로고침</ReloadText>
        </>
      )}
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

const ReloadText = styled(Link)``;
