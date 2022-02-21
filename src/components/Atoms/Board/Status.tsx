import React from 'react';
import ViewSVG from '@src/assets/view.svg';
import HeartSVG from '@src/assets/heart.svg';
import CommentSVG from '@src/assets/comment.svg';
import styled from 'styled-components';
const Status = () => {
  return (
    <Container>
      <CommentSVG />
      <Counter>25</Counter>
      <ViewSVG />
      <Counter>103</Counter>
      <HeartSVG />
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
