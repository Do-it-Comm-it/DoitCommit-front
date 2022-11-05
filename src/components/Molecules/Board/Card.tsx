import CardContent from './CardContent';
import Thumbnail from '@src/components/Atoms/Board/Thumbnail';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IBoard } from '@src/typings/Board';
import Status from '@src/components/Atoms/Board/Status';
import { useRecoilValue } from 'recoil';
import myBoardAtom from '@src/recoil/atom/myBoard';
interface Props {
  board: IBoard;
  category: number | null;
  search: string;
  isBookmark: boolean;
  isHome?: boolean; // 아티클페이지인지 메인페이지인지 구별하는 Prop
}
const Card = ({ board, category, search, isBookmark, isHome }: Props) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const myBoard = useRecoilValue(myBoardAtom);
  const onToggle = useCallback((value) => {
    setIsHover(value);
  }, []);
  
  return (
    <>
      {isHome ? (
        <Container
          isHome={true}
          onMouseEnter={() => {
            onToggle(true);
          }}
          onMouseLeave={() => {
            onToggle(false);
          }}
        >
          <Link
            to={`/community/board/${board.boardId}`}
            style={{ width: '100%', textDecoration: 'none' }}
          >
            {/* TODO: 22.07-31 썸네일, writer Props는 백엔드 수정 후 변경해준다.*/}
            <Thumbnail
              thumbnail={board.thumbnailUrl ? board.thumbnailUrl : null}
              writerImageUrl={board.writerImageUrl}
              isHome={true}
              writer={board.writer ? board.writer : '사용자이름'}
              tags={board.boardHashtagNameList}
            />
          </Link>
          <CardContent
            board={board}
            category={category}
            search={search}
            isBookmark={isBookmark}
            isHome={isHome}
            isHover={isHover}
          />
        </Container>
      ) : (
        <Container
          onMouseEnter={() => {
            onToggle(true);
          }}
          onMouseLeave={() => {
            onToggle(false);
          }}
        >
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
            isHover={isHover}
          />
          {myBoard.bookmark || myBoard.history ? (
            <Bottom>
              <Author>by. {board.writer}</Author>
              <Status
                board={board}
                category={category}
                search={search}
                isBookmark={isBookmark}
              />
              <Block
              >
                <Circle/>
                <Circle/>
                <Circle/>
              </Block>
            </Bottom>
          ) : (
            <Bottom>
              <Author>by. {board.writer}</Author>
              <Status
                board={board}
                category={category}
                search={search}
                isBookmark={isBookmark}
              />
            </Bottom>
          )}
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


const Block = styled.div`
  cursor: pointer;
`;

const Circle = styled.div`
  border-radius: 50px;
  width: 3px;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.gray.gray400};
  margin: 3px 0px;
`;