import Status from '@src/components/Atoms/Board/Status';
import { IBoard } from '@src/typings/Board';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { useBoardListMutation } from '@src/hooks/useBoards';
import { board as boardApi } from '@src/service/api';
interface Props {
  board: IBoard;
  category: number | null;
  search: string;
  isBookmark: boolean;
  isHome: boolean;
  isPopular: boolean;
}

const PCard = ({
  board,
  category,
  search,
  isBookmark,
  isHome,
  isPopular,
}: Props) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const onToggle = useCallback((value) => {
    setIsHover(value);
  }, []);
  const theme = useTheme();
  const mutation = useBoardListMutation(
    {
      myBookmark: !board.myBookmark,
    },
    boardApi.toggleBookmark,
    category,
    search,
    isBookmark,
    isHome,
    isPopular
  );
  const onClickBookmark = useCallback(async () => {
    mutation.mutate(board);
  }, [mutation, board]);
  return (
    <Container
      onMouseEnter={() => {
        onToggle(true);
      }}
      onMouseLeave={() => {
        onToggle(false);
      }}
    >
      <BookMark>
        {board.myBookmark ? (
          <BsBookmarkFill
            onClick={onClickBookmark}
            color={theme.colors.primary.default}
            style={{
              marginLeft: 'auto',
              cursor: 'pointer',
              transition: 'all 0.7s',
              opacity: isHover ? 1 : 0,
            }}
          />
        ) : (
          <BsBookmark
            onClick={onClickBookmark}
            style={{
              marginLeft: 'auto',
              cursor: 'pointer',
              color: theme.colors.gray.gray400,
              transition: 'all 0.7s',
              opacity: isHover ? 1 : 0,
            }}
          />
        )}
      </BookMark>
      <Wrap>
        <Top>
          <Writer src={board.writerImageUrl} />
          <MarginLeft>
            <Title>{board.boardTitle}</Title>
            <Row>
              <Author>by. {board.writer ? board.writer : '사용자이름'}</Author>
              <MarginLeft>
                <Status
                  board={board}
                  category={category}
                  search={search}
                  isBookmark={isBookmark}
                  isHome={false}
                  isPopular={true}
                />
              </MarginLeft>
            </Row>
          </MarginLeft>
        </Top>
        <Link
          to={`/community/board/${board.boardId}`}
          style={{ width: '100%', textDecoration: 'none' }}
        >
          <Middle>
            <TagsContainer>
              {board.boardHashtagNameList?.map((tag, id) => (
                <Tags key={id}>#{tag}</Tags>
              ))}
            </TagsContainer>
          </Middle>
          <Bottom>
            {board.boardContent
              .replace(/<\/?[^>]+(>|$)/g, '')
              .substring(0, 80) + '...'}
          </Bottom>
        </Link>
      </Wrap>
    </Container>
  );
};

const Container = styled.div<{ img?: string }>`
  width: 100%;
  height: 281px;
  background-image: ${({ img }) => (img ? `url(${img})` : null)};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  object-fit: cover;
  ${({ img }) =>
    img
      ? `background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(${img})`
      : `background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8))`};
  border-radius: 10px;
  /* margin: 0 20px; */
  position: relative;
`;

const Wrap = styled.div`
  padding: 50px 60px;
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.gray.gray100};
  font-weight: 500;
  font-size: 18px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  z-index: 0;
`;

const Middle = styled.div`
  margin-top: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Bottom = styled.div`
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.gray.gray200};
  font-size: 14px;
`;

const Author = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray.gray400};
`;

const Writer = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 10px;
`;

const TagsContainer = styled.div``;
// 빈 div역할
const Tags = styled.span`
  color: ${({ theme }) => theme.colors.primary.default};
  font-weight: 400;
  font-size: 14px;
  margin-left: 8px;
  &:first-child {
    margin: 0;
  }
`;

const BookMark = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
`;

const MarginLeft = styled.div`
  margin-left: 20px;
`;
export default React.memo(PCard);
