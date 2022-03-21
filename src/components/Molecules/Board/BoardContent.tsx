import { IBoard } from '@src/typings/Board';
import React from 'react';
import styled from 'styled-components';
import CommentBox from './CommentBox';
import CommentEditor from './CommentEditor';
import useComments from '@src/hooks/useComments';
import { IComment } from '@src/typings/Comment';

interface Props {
  boardData: IBoard;
}
const BoardContent = ({ boardData }: Props) => {
  const { data: commentsData, isLoading } = useComments(boardData.boardId!);
  return (
    <Container>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: boardData.boardContent }}></div>
      </Content>
      {/* 댓글이 5개가 넘었을 경우 더보기 */}

      {!isLoading &&
        commentsData?.commentResDtoList?.dtoList.map((c: IComment) => (
          <CommentBox
            key={c.commentId}
            boardId={boardData.boardId!}
            mentionData={commentsData.memberTagResDtoList}
            commentData={c}
          />
        ))}
      {!isLoading && (
        <CommentEditor boardId={boardData.boardId!} mentionData={commentsData?.memberTagResDtoList || []} />
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
  & > h2 {
    margin: 1.2rem 0;
  }
  & > img {
    width: 100%;
    margin: 3rem 0;
  }
`;
