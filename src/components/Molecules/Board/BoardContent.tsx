import { IBoard } from '@src/typings/Board';
import React from 'react';
import styled from 'styled-components';
import CommentBox from './CommentBox';
import CommentEditor from './CommentEditor';
import useComments from '@src/hooks/useComments';
import { IComment, ICommentRes } from '@src/typings/Comment';
import ExpandIconSVG from '@src/assets/expand_comment.svg';
import CommentIconSVG from '@src/assets/comment.svg';

interface Props {
  boardData: IBoard;
}
const BoardContent = ({ boardData }: Props) => {
  const { comments, isLoading, fetchNextPage, hasNextPage } = useComments(
    boardData.boardId!
  );

  const getComputedExtraPage = (
    page: {
      commentsData: ICommentRes;
      nextPage: number;
    }[]
  ) => {
    if (page[0].commentsData.commentCount >= 5 * (page.length + 1)) {
      return 5;
    }
    return page[0].commentsData.commentCount % 5;
  };

  return (
    <Container>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: boardData.boardContent }}></div>
      </Content>
      {/* 댓글이 5개가 넘었을 경우 더보기 */}
      <CommentCountWrapper>
        <CommentIconSVG />
        <span>{comments?.pages[0].commentsData.commentCount}</span>
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
        <LoadMoreWrapper>
          <div onClick={() => fetchNextPage()}>
            <span>
              {getComputedExtraPage(comments?.pages!)}개의 댓글 더 보기
            </span>
            <ExpandIconSVG />
          </div>
        </LoadMoreWrapper>
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

const LoadMoreWrapper = styled.div`
  display: flex;
  flex-basis: content;
  flex-direction: row;
  justify-content: center;
  gap: 4px;
  margin-bottom: 1.75rem;

  & > div {
    display: flex;
    align-items: center;
    cursor: pointer;
    & > span {
      color: ${({ theme }) => theme.colors.primary.default};
      font-weight: 500;
      font-size: 20px;
    }

    & > svg {
      & > path {
        fill: ${({ theme }) => theme.colors.primary.default};
      }
    }
  }
`;
const CommentCountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  gap: 5px;

  & > span {
    color: ${({ theme }) => theme.colors.primary.default};
    font-weight: 400;
    font-size: 16px;
  }
`;
