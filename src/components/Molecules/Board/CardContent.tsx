import React from 'react';
import styled, { useTheme } from 'styled-components';
import { BsBookmark } from 'react-icons/bs';
import Highlighter from 'react-highlight-words';
import { useRecoilValue } from 'recoil';
import keywordState from '@src/recoil/selector/keyword';
import { IBoard } from '@src/typings/Board';

interface Props {
  board: IBoard;
}
const CardContent = ({ board }: Props) => {
  const theme = useTheme();
  const keyword = useRecoilValue(keywordState);
  return (
    <Container>
      <Top>
        <Tags>#직장인 #공대생 #취준생</Tags>
        <BsBookmark
          style={{
            marginLeft: 'auto',
            color: theme.colors.dark.a3,
          }}
        />
      </Top>
      <Middle>
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
      </Middle>
    </Container>
  );
};

export default CardContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
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
  gap: 10px;
`;
