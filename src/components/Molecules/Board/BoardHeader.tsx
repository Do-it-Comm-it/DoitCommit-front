import React, { useCallback } from 'react';
import styled from 'styled-components';
import HeartIconSVG from '@src/assets/heart.svg';
import { IBoard } from '@src/typings/Board';
import { format, parseISO } from 'date-fns';
import { board } from '@src/service/api';
import BookmarkIconSVG from '@src/assets/bookmark.svg';
import BookmarkIconFillSVG from '@src/assets/bookmark_fill.svg';
import { useSingleBoardMutation } from '@src/hooks/useBoards';
interface Props {
  boardData: IBoard;
}
const BoardHeader = ({ boardData }: Props) => {
  const mutationHeart = useSingleBoardMutation(
    {
      myHeart: !boardData.myHeart,
      boardId: boardData.boardId,
    },
    board.toggleHeart
  );

  const mutationBookmark = useSingleBoardMutation(
    {
      myBookmark: !boardData.myBookmark,
      boardId: boardData.boardId,
    },
    board.toggleBookmark
  );
  const onClickHeart = useCallback(async () => {
    mutationHeart.mutate(boardData);
  }, [mutationHeart, boardData]);
  const onClickBookmark = useCallback(async () => {
    mutationBookmark.mutate(boardData);
  }, [mutationBookmark, boardData]);
  return (
    <Container>
      <Left>
        <Title>{boardData.boardTitle}</Title>
        <Info>
          {boardData.boardHashtagNameList?.map((tag, id) => (
            <Tag key={id}>#{tag}</Tag>
          ))}
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
          {boardData.myBookmark ? (
            <BookmarkFill onClick={onClickBookmark} width={24} height={24} />
          ) : (
            <Bookmark onClick={onClickBookmark} width={24} height={24} />
          )}
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
  color: ${({ theme }) => theme.colors.gray.gray950};
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
  color: ${({ theme }) => theme.colors.gray.gray950};
`;

const Author = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray.gray400};
  line-height: 40px;
  padding-left: 1.75rem;
`;
const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  & > svg {
    cursor: pointer;
  }
`;

const Heart = styled(HeartIconSVG)`
  & > path {
    stroke: ${({ theme }) => theme.colors.gray.gray400};
  }
`;

const HeartFill = styled(HeartIconSVG)`
  & > path {
    fill: ${({ theme }) => theme.colors.warning};
    stroke: none;
  }
`;

const Bookmark = styled(BookmarkIconSVG)`
  & > path {
    fill: ${({ theme }) => theme.colors.gray.gray400};
  }
`;
const BookmarkFill = styled(BookmarkIconFillSVG)``;
