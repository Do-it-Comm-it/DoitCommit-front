import { IBoard } from '@src/typings/Board';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import CommentBox from './CommentBox';
import CommentEditor from './CommentEditor';
import useComments from '@src/hooks/useComments';
import { IComment, ICommentRes } from '@src/typings/Comment';
import CommentIconSVG from '@src/assets/comment.svg';
import ShowMoreText from '@src/components/Atoms/ShowMoreText';

interface Props {
  boardData: IBoard;
}
const BoardContent = ({ boardData }: Props) => {
  const { comments, isLoading, fetchNextPage, hasNextPage } = useComments(
    boardData.boardId!
  );

  const getComputedExtraPage = useCallback(
    (
      page: {
        commentsData: ICommentRes;
        nextPage: number;
      }[]
    ) => {
      if (page[0].commentsData.parentCommentCnt >= 3 * (page.length + 1)) {
        return 3;
      }
      return page[0].commentsData.parentCommentCnt % 3;
    },
    []
  );

  return (
    <Container>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: boardData.boardContent }} />
      </Content>
      <CommentCountWrapper>
        <CommentIconSVG />
        <TotalText>{comments?.pages[0].commentsData.totalCommentCnt}</TotalText>
      </CommentCountWrapper>

      {!isLoading &&
        comments?.pages.map(({ commentsData }) =>
          commentsData.commentResDtoList.dtoList.map((c: IComment) => (
            <CommentBox
              key={c.commentId}
              boardId={boardData.boardId!}
              mentionData={commentsData.memberTagResDtoList}
              commentData={c}
              commentParentId={c.commentId}
              depth={0}
              childLength={c.childList.length}
            />
          ))
        )}
      {hasNextPage && (
        <ShowMoreText
          onClick={() => fetchNextPage()}
          length={getComputedExtraPage(comments?.pages!)}
        />
      )}
      {!isLoading && (
        <CommentEditor
          mentionData={
            comments?.pages[0].commentsData.memberTagResDtoList || []
          }
          boardId={boardData.boardId!}
        />
      )}
    </Container>
  );
};

export default BoardContent;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 200px;
  & > div {
    color: ${({ theme }) => theme.colors.black};
    & > * {
      color: ${({ theme }) => theme.colors.gray.gray500};
      font-weight: 400;
    }
    & > p {
      color: ${({ theme }) => theme.colors.gray.gray500};
      font-weight: 400;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${({ theme }) => theme.colors.gray.gray950};
      margin: 1.2rem 0;
    }
    img {
      display: block;
      margin: 0 auto;
      max-width: 100%;
    }
  }
`;

const CommentCountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  gap: 5px;
`;

const TotalText = styled.span`
  color: ${({ theme }) => theme.colors.primary.default};
  font-weight: 400;
  font-size: 16px;
`;
