import React, { useCallback } from 'react';
import ViewSVG from '@src/assets/view.svg';
import HeartSVG from '@src/assets/heart.svg';
import CommentSVG from '@src/assets/comment.svg';
import styled from 'styled-components';
import { IBoard } from '@src/typings/Board';
import { useMutation, useQueryClient } from 'react-query';
import { board as boardApi } from '@src/service/api';
interface Props {
  board: IBoard;
}
const Status = ({ board }: Props) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(boardApi.toggleHeart, {
    onMutate: async (selectedBoard) => {
      await queryClient.cancelQueries('boards');
      const snapshotOfPreviousTweets = queryClient.getQueryData('boards');
      await queryClient.setQueryData('boards', (old: any) => {
        return {
          ...old,
          pages: old.pages.map((page: any) => {
            return {
              ...page,
              data: page.data.map((board: IBoard) => {
                if (board.boardId === selectedBoard.boardId) {
                  return {
                    ...board,
                    myHeart: !board.myHeart,
                    heartCnt: board.myHeart ? board.heartCnt! - 1 : board.heartCnt! + 1,
                  };
                } else {
                  return {
                    ...board,
                  };
                }
              }),
            };
          }),
        };
      });

      // Return a snapshot so we can rollback in case of failure
      return {
        snapshotOfPreviousTweets,
      };
    },
    onSuccess() {
      queryClient.invalidateQueries('boards');
    },
  });
  const onClickHeart = useCallback(async () => {
    mutation.mutate(board);
  }, [board, mutation]);
  return (
    <Container>
      <CommentSVG />
      <Counter>25</Counter>
      <ViewSVG />
      <Counter>{board.boardCnt}</Counter>
      {board.myHeart ? (
        <HeartFill onClick={onClickHeart} width={20} height={20} style={{ cursor: 'pointer' }} />
      ) : (
        <Heart onClick={onClickHeart} width={20} height={20} style={{ cursor: 'pointer' }} />
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
  color: ${({ theme }) => theme.colors.dark.a3};
  font-size: 16px;
  font-weight: 400;
`;

const Heart = styled(HeartSVG)`
  & > path {
    stroke: ${({ theme }) => theme.colors.dark.a3};
  }
`;

const HeartFill = styled(HeartSVG)`
  & > path {
    fill: ${({ theme }) => theme.colors.warning};
  }
`;
