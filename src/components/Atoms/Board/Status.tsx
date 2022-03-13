import React from 'react';
import ViewSVG from '@src/assets/view.svg';
import HeartSVG from '@src/assets/heart.svg';
import CommentSVG from '@src/assets/comment.svg';
import styled from 'styled-components';
import { IBoard } from '@src/typings/Board';

interface Props {
  board: IBoard;
}
const Status = ({ board }: Props) => {
  return (
    <Container>
      <CommentSVG />
      <Counter>25</Counter>
      <ViewSVG />
      <Counter>{board.boardCnt}</Counter>
      <Heart width={20} height={20} />
      <Counter>103</Counter>
    </Container>
  );
};

export default Status;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: auto;
  & > * {
    margin-right: 5px;
  }
`;
const Counter = styled.span`
  color: ${({ theme }) => theme.colors.dark.a3};
  font-size: 16px;
  font-weight: 400;
`;

const Heart = styled(HeartSVG)`
  & > path {
    stroke: ${({ theme }) => theme.colors.dark.a3};
  }
`;
