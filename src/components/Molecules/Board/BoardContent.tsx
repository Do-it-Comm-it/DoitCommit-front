import { IBoard } from '@src/typings/Board';
import React from 'react';
import styled from 'styled-components';
import CommentBox from './CommentBox';
import CommentEditor from './CommentEditor';

interface Props {
  boardData: IBoard;
}
const BoardContent = ({ boardData }: Props) => {
  return (
    <Container>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: boardData.boardContent }}></div>
      </Content>
      {/* 댓글이 5개가 넘었을 경우 더보기 */}
      <CommentBox />
      <CommentBox />
      <CommentBox />
      <CommentBox />
      <CommentBox />
      <CommentEditor boardId={boardData.boardId!} />
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
