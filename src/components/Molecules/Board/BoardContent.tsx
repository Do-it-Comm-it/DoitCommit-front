import React from 'react';
import styled, { useTheme } from 'styled-components';
import Status from '@src/components/Atoms/Board/Status';
import { BsBookmark } from 'react-icons/bs';
import Highlighter from 'react-highlight-words';
import { useRecoilValue } from 'recoil';
import keywordState from '@src/recoil/selector/keyword';

const BoardContent = () => {
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
            textToHighlight="나는 개발자 입니다."
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
            textToHighlight="난 항상 궁금하게 생각했다 어떤 개발자가 더 성공하 고 어떤 개발자가 이도저도 아니게 되는지를 곰곰히 생각 해 ...
            "
          />
        </Content>
      </Middle>

      <Bottom>
        <Author>by. 월급루팡</Author>
        <Status />
      </Bottom>
    </Container>
  );
};

export default BoardContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 194px;
  background-color: inherit;
  padding: 5%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
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

const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Middle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > p {
    margin-bottom: 10px;
  }
`;

const Author = styled(Content)``;
