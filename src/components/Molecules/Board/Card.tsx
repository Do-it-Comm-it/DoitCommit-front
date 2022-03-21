import CardContent from './CardContent';
import Thumbnail from '@src/components/Atoms/Board/Thumbnail';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IBoard } from '@src/typings/Board';
interface Props {
  board: IBoard;
}
const Card = ({ board }: Props) => {
  return (
    <Container>
      <Link to={`/community/board/${board.boardId}`}>
        <Thumbnail thumbnail={board.thumbnail} />
      </Link>
      <CardContent board={board} />
    </Container>
  );
};

export default Card;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 386px;
  max-width: 386px;
  height: 451px;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 10px;
  justify-self: center;
  @media (max-width: 500px) {
    width: 90%;
  }
`;
