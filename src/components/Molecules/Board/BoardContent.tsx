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
        {/* 지금은 샘플 html, 추후에 html 렌더링 */}
        {/* <h2>What the CSS!!!</h2>
        <p>
          CSS는 쉽습니다. 처음에는 ‘너무 쉬운데’라는 생각이 들 정도로 간단해 보입니다. 특정 언어처럼 난해한 개념도
          없습니다. 직관적이고 간결합니다. 하지만, 신기하게도 CSS는 어렵습니다. 조금이라도 복잡한 페이지를 만들어 봤다면
          이해할 것입니다. Layout이 깨져 보이는데, 문제를 도통 알 수 없습니다. 이렇게도 해보고 저렇게도 해보지만 잘
          해결되지 않습니다. 10분이면 끝날 줄 알았던 작업이 퇴근 시간을 훌쩍 넘겨 버립니다.
        </p>
        <img
          src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlzaW9ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          alt="image123"
        />
        <h2>What the CSS!!!</h2>
        <p>
          CSS는 쉽습니다. 처음에는 ‘너무 쉬운데’라는 생각이 들 정도로 간단해 보입니다. 특정 언어처럼 난해한 개념도
          없습니다. 직관적이고 간결합니다. 하지만, 신기하게도 CSS는 어렵습니다. 조금이라도 복잡한 페이지를 만들어 봤다면
          이해할 것입니다. Layout이 깨져 보이는데, 문제를 도통 알 수 없습니다. 이렇게도 해보고 저렇게도 해보지만 잘
          해결되지 않습니다. 10분이면 끝날 줄 알았던 작업이 퇴근 시간을 훌쩍 넘겨 버립니다.
        </p> */}
        {boardData.boardContent}
      </Content>
      {/* 댓글이 5개가 넘었을 경우 더보기 */}
      <CommentBox />
      <CommentBox />
      <CommentBox />
      <CommentBox />
      <CommentBox />
      <CommentEditor />
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
