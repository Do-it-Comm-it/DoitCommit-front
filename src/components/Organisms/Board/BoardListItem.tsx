import { IBoard } from '@src/typings/Board';
import React from 'react';
import styled from 'styled-components';

type Props = {
  board: IBoard;
};

const BoardListItem = ({ board }: Props) => {
  return (
    <Container>
      {board.thumbnailUrl ? <ThumbnailImage /> : null}
      <Content>
        <Title>{board.boardTitle}</Title>
        <Description>{board.boardContent}</Description>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const ThumbnailImage = styled.img``;
const Content = styled.div`
  display: flex;
  flex-direction: column;
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
