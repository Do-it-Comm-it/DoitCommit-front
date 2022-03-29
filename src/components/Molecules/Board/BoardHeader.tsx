import React, { useCallback } from 'react';
import styled from 'styled-components';
import HeartIconSVG from '@src/assets/heart.svg';
import Bookmark from '@src/assets/bookmark.svg';
import { IBoard } from '@src/typings/Board';
import { format, parseISO } from 'date-fns';
import { useMutation, useQueryClient } from 'react-query';
import { board } from '@src/service/api';
interface Props {
  boardData: IBoard;
}
const BoardHeader = ({ boardData }: Props) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(board.toggleHeart, {
    onMutate: async (selectedBoard) => {
      await queryClient.cancelQueries(`board/${boardData.boardId}`);
      const snapshot = queryClient.getQueryData(`board/${boardData.boardId}`);
      queryClient.setQueryData(`board/${boardData.boardId}`, (old: any) => {
        return {
          ...old,
          myHeart: !boardData.myHeart,
        };
      });

      return {
        snapshot,
      };
    },
    onSuccess() {
      queryClient.invalidateQueries(`board/${boardData.boardId}`);
    },
  });
  const onClickHeart = useCallback(async () => {
    mutation.mutate(boardData);
  }, [mutation, boardData]);
  return (
    <Container>
      <Left>
        <Title>{boardData.boardTitle}</Title>
        <Info>
          {boardData.boardHashtag?.map((tag: any) => {
            return Object.keys(tag).map((key) => <Tag key={key}>#{tag[key]}</Tag>);
          })}
          <Author>
            by. {boardData.writer} {format(parseISO(boardData.regDate), 'PP')}
          </Author>
        </Info>
      </Left>
      <Right>
        <IconWrapper>
          {boardData.myHeart ? (
            <HeartFill onClick={onClickHeart} width={24} height={24} />
          ) : (
            <Heart onClick={onClickHeart} width={24} height={24} />
          )}
          <Bookmark width={24} height={24} />
        </IconWrapper>
      </Right>
    </Container>
  );
};

export default BoardHeader;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
`;

const Title = styled.span`
  color: ${({ theme }) => theme.colors.dark.a7};
  font-size: 35px;
  font-weight: 700;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
const Tag = styled.span`
  font-size: 25px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.dark.a7};
`;

const Author = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.dark.a3};
  line-height: 40px;
  padding-left: 1.75rem;
`;
const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10 px;
  & > svg {
    & > path {
      stroke: ${({ theme }) => theme.colors.dark.a3};
    }
  }
`;

const Heart = styled(HeartIconSVG)``;

const HeartFill = styled(HeartIconSVG)`
  & > path {
    fill: ${({ theme }) => theme.colors.warning};
  }
`;
