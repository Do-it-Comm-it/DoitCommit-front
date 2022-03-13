import React from 'react';
import styled from 'styled-components';
import Heart from '@src/assets/heart.svg';
import Bookmark from '@src/assets/bookmark.svg';
import { IBoard } from '@src/typings/Board';
import { format, parseISO } from 'date-fns';
interface Props {
  boardData: IBoard;
}
const BoardHeader = ({ boardData }: Props) => {
  return (
    <Container>
      <Left>
        <Title>{boardData.boardTitle}</Title>
        <Info>
          {boardData.tag?.map((tag) => (
            <Tag>{tag}</Tag>
          ))}
          <Author>
            by. {boardData.writer} {format(parseISO(boardData.regDate), 'PP')}
          </Author>
        </Info>
      </Left>
      <Right>
        <IconWrapper>
          <Heart width={24} height={24} />
          <Bookmark width={24} height={24} />
        </IconWrapper>
      </Right>
    </Container>
  );
};

export default BoardHeader;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
`;

const Title = styled.span`
  color: ${({ theme }) => theme.colors.dark.a7};
  font-size: 35px;
  font-weight: 700;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  gap: 22px;
`;
const Tag = styled.span`
  font-size: 25px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.dark.a7};
`;

const Author = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.dark.a3};
  line-height: 40px;
`;
const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10 px;
  & > svg {
    & > path {
      stroke: ${({ theme }) => theme.colors.dark.a3};
    }
  }
`;
