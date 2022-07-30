import CardContent from './CardContent';
import Thumbnail from '@src/components/Atoms/Board/Thumbnail';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IBoard } from '@src/typings/Board';
import Status from '@src/components/Atoms/Board/Status';

interface Props {
  board: IBoard;
  category: number | null;
  search: string;
  isBookmark: boolean;
  isHome?: boolean; // 아티클페이지인지 메인페이지인지 구별하는 Prop
}
const Card = ({ board, category, search, isBookmark, isHome }: Props) => {
  console.log(board);

  return (
    <>
      {isHome ? (
        <Container isHome={true}>
          <Link
            to={`/community/board/${board.boardId}`}
            style={{ width: '100%', textDecoration: 'none' }}
          >
            <Thumbnail
              thumbnail={
                'https://doitcommit.s3.ap-northeast-2.amazonaws.com/2022/07/24/99cef549-f0f3-41e9-94fc-d1f3770dfa01_MjA2NDkuNDAwODY5NDU2NDM2MTY1ODY0NjkwOTQzNg%3D.png'
              }
              writerImageUrl={board.writerImageUrl}
              isHome={true}
              writer={'사용자이름'}
              tags={board.boardHashtagNameList}
            />
          </Link>
          <CardContent
            board={board}
            category={category}
            search={search}
            isBookmark={isBookmark}
            isHome={isHome}
          />
        </Container>
      ) : (
        <Container>
          <Link
            to={`/community/board/${board.boardId}`}
            style={{ width: '100%', textDecoration: 'none' }}
          >
            <Thumbnail
              thumbnail={board.thumbnailUrl}
              writerImageUrl={board.writerImageUrl}
            />
          </Link>
          <CardContent
            board={board}
            category={category}
            search={search}
            isBookmark={isBookmark}
          />
          <Bottom>
            <Author>by. {board.writer}</Author>
            <Status
              board={board}
              category={category}
              search={search}
              isBookmark={isBookmark}
            />
          </Bottom>
        </Container>
      )}
    </>
  );
};

export default React.memo(Card);

const Container = styled.div<{ isHome?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 386px;
  max-width: 386px;
  height: ${({ isHome }) => (isHome ? '330px' : '451px')};
  background-color: ${({ theme }) => theme.colors.gray.gray100};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 10px;
  justify-self: center;
  @media (max-width: 500px) {
    width: 90%;
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0 5%;
  padding-bottom: 5%;
  margin-top: auto;
`;

const Author = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray.gray400};
`;
