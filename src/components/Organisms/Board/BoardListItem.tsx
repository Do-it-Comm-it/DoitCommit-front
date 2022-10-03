import { IBoard } from '@src/typings/Board';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

type Props = {
  board: IBoard;
};

const BoardListItem = ({ board }: Props) => {
  const navigate = useNavigate();

  const onClickBoard = useCallback(() => {
    navigate('/community/board/' + board.boardId);
  }, [board, navigate]);

  return (
    <Container onClick={onClickBoard}>
      {board.thumbnailUrl ? <ThumbnailImage src={board.thumbnailUrl} /> : null}
      <Content>
        <Title>{board.boardTitle}</Title>
        <Description
          dangerouslySetInnerHTML={{
            __html:
              board.boardContent
                .replace(/<\/?[^>]+(>|$)/g, '')
                .substring(0, 80) + '...',
          }}
        />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  background: ${({ theme }) => theme.colors.gray.gray100};

  box-shadow: 0px 0px 20px rgba(143, 146, 148, 0.1);
  border-radius: 10px;

  cursor: pointer;
`;

const ThumbnailImage = styled.img`
  width: 240px;
  height: 180px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;

  padding: 50px;
`;
const Title = styled.h3`
  /* Body_25px/Body_Medium_25px */

  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 38px;
  color: ${({ theme }) => theme.colors.gray.gray950};
`;
const Description = styled.div`
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  /* Gray/Gray400 */
  color: ${({ theme }) => theme.colors.gray.gray400};
`;

export default BoardListItem;
