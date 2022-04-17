import CardContent from './CardContent';
import Thumbnail from '@src/components/Atoms/Board/Thumbnail';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IBoard } from '@src/typings/Board';
import Status from '@src/components/Atoms/Board/Status';

interface Props {
  board: IBoard;
}
const Card = ({ board }: Props) => {
  return (
    <Container>
      <Link
        to={`/community/board/${board.boardId}`}
        style={{ width: '100%', textDecoration: 'none' }}
      >
        <Thumbnail
          thumbnail={board.thumbnailUrl}
          writerImageUrl={board.writerImageUrl}
        />
      </Link>
      <CardContent board={board} />

      <Bottom>
        <Author>by. {board.writer}</Author>
        <Status board={board} />
      </Bottom>
    </Container>
  );
};

export default React.memo(Card);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 386px;
  max-width: 386px;
  height: 451px;
  background-color: ${({ theme }) => theme.colors.gray.gray100};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 10px;
  justify-self: center;
  @media (max-width: 500px) {
    width: 90%;
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0 5%;
  padding-bottom: 5%;
  margin-top: auto;
`;

const Author = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray.gray400};
`;
