import { IBoard } from '@src/typings/Board';
import React from 'react';
import styled from 'styled-components';
import CommentBox from './CommentBox';
import CommentEditor from './CommentEditor';

interface Props {
  boardData: IBoard;
}
const BoardContent = ({ boardData }: Props) => {
  const commentExample = [
    {
      content: '안녕하세요',
      mentions: [],
    },
    {
      content: '@[장준민]{1} 반갑습니다 ',
      mentions: ['1'],
    },
    {
      content: '@[조수권]{2} @[김정규]{3} ㅎㅇㅎㅇ',
      mentions: ['2', '3'],
    },
  ];
  const mentionsExample = [
    {
      id: '1',
      display: '장준민',
    },
    {
      id: '2',
      display: '조수권',
    },
    {
      id: '3',
      display: '김정규',
    },
    {
      id: '4',
      display: '유태선',
    },
    {
      id: '5',
      display: '김진영',
    },
  ];
  return (
    <Container>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: boardData.boardContent }}></div>
      </Content>
      {/* 댓글이 5개가 넘었을 경우 더보기 */}
      {commentExample.map((comment, i) => (
        <CommentBox key={i} boardId={boardData.boardId!} mentionData={mentionsExample} commentData={comment} />
      ))}
      <CommentEditor boardId={boardData.boardId!} mentionData={mentionsExample} />
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
