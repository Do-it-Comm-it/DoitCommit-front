import BoardContent from '@src/components/Molecules/Board/BoardContent';
import BoardHeader from '@src/components/Molecules/Board/BoardHeader';
import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

interface ParamType {
  id: string;
}
const Board = () => {
  const { id }: ParamType = useParams();
  return (
    <Container>
      <BoardHeader />
      <BoardContent />
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
