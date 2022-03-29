import React, { useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import Highlighter from 'react-highlight-words';
import { useRecoilValue } from 'recoil';
import keywordState from '@src/recoil/selector/keyword';
import { IBoard } from '@src/typings/Board';
import { board as boardApi } from '@src/service/api';
import { Link } from 'react-router-dom';
import { useBoardListMutation } from '@src/hooks/useBoards';
interface Props {
  board: IBoard;
}
const CardContent = ({ board }: Props) => {
  const theme = useTheme();
  const keyword = useRecoilValue(keywordState);
  const mutation = useBoardListMutation(
    {
      myBookmark: !board.myBookmark,
    },
    boardApi.toggleBookmark,
  );
  const onClickBookmark = useCallback(async () => {
    mutation.mutate(board);
  }, [mutation, board]);
  return (
    <Container>
      <Top>
        <Tags>#직장인 #공대생 #취준생</Tags>
        {board.myBookmark ? (
          <BsBookmarkFill
            onClick={onClickBookmark}
            color={theme.colors.main}
            style={{ marginLeft: 'auto', cursor: 'pointer' }}
          />
        ) : (
          <BsBookmark
            onClick={onClickBookmark}
            style={{
              marginLeft: 'auto',
              cursor: 'pointer',
              color: theme.colors.dark.a3,
            }}
          />
        )}
      </Top>
      <Middle>
        <Link
          to={`/community/board/${board.boardId}`}
          style={{ width: '100%', height: '100%', textDecoration: 'none' }}
        >
          <Title>
            <Highlighter
              highlightStyle={{
                color: theme.colors.main,
              }}
              highlightTag="strong"
              searchWords={keyword}
              autoEscape={true}
              textToHighlight={board.boardTitle}
            />
          </Title>
          <Content>
            <Highlighter
              highlightStyle={{
                color: theme.colors.main,
              }}
              highlightTag="strong"
              searchWords={keyword}
              autoEscape={true}
              textToHighlight={board.boardContent.replace(/<\/?[^>]+(>|$)/g, '')}
            />
          </Content>
        </Link>
      </Middle>
    </Container>
  );
};

export default CardContent;

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  background-color: inherit;
  padding: 5%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  gap: 10px;
`;
const Tags = styled.span`
  color: ${({ theme }) => theme.colors.dark.a3};
  font-weight: 400;
  font-size: 14px;
`;

const Title = styled.p`
  color: ${({ theme }) => theme.colors.dark.a7};
  font-weight: 500;
  font-size: 18px;
`;

const Content = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.dark.a3};
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Middle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 10px;
`;
