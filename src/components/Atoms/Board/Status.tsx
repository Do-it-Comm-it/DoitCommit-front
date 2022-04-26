import React, { useCallback } from 'react';
import ViewSVG from '@src/assets/view.svg';
import HeartSVG from '@src/assets/heart.svg';
import CommentSVG from '@src/assets/comment.svg';
import styled from 'styled-components';
import { IBoard } from '@src/typings/Board';
import { useBoardListMutation } from '@src/hooks/useBoards';
import { board as boardApi } from '@src/service/api';

interface Props {
  board: IBoard;
}
const Status = ({ board }: Props) => {
  const mutation = useBoardListMutation(
    {
      myHeart: !board.myHeart,
      heartCnt: board.myHeart ? board.heartCnt! - 1 : board.heartCnt! + 1,
    },
    boardApi.toggleHeart
  );
  const onClickHeart = useCallback(async () => {
    mutation.mutate(board);
  }, [board, mutation]);

  return (
    <Container>
      <CommentSVG />
      <Counter>{board.commentCnt}</Counter>
      <ViewSVG />
      <Counter>{board.boardCnt}</Counter>
      {board.myHeart ? (
        <HeartFill
          onClick={onClickHeart}
          width={20}
          height={20}
          style={{ cursor: 'pointer' }}
        />
      ) : (
        <Heart
          onClick={onClickHeart}
          width={20}
          height={20}
          style={{ cursor: 'pointer' }}
        />
      )}

      <Counter>{board.heartCnt}</Counter>
    </Container>
  );
};

export default Status;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: auto;
  & > * {
    margin-right: 5px;
  }
`;
const Counter = styled.span`
  color: ${({ theme }) => theme.colors.gray.gray400};
  font-size: 16px;
  font-weight: 400;
`;

const Heart = styled(HeartSVG)`
  & > path {
    stroke: ${({ theme }) => theme.colors.gray.gray400};
  }
`;

const HeartFill = styled(HeartSVG)`
  & > path {
    fill: ${({ theme }) => theme.colors.warning};
    stroke: none;
  }
`;
