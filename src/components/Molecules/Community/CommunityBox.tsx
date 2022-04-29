import React from 'react';
import styled from 'styled-components';
import { BsFillBookmarkFill, BsBookmark } from 'react-icons/bs';
import { IBoard } from '@src/typings/Board';
type CommunityBoxProps = {
  item: IBoard;
};

const CommunityBox = ({ item }: CommunityBoxProps) => {
  return (
    <Container>
      <Header>
        <Title>{item.boardHashtagNameList?.map((tag) => `#${tag}`)}</Title>
        {item.myBookmark ? <BookMarkFill /> : <BookMark />}
      </Header>
      <Content>
        <TechBox>
          <Circle />
        </TechBox>
        <ContentBox>
          <SubTitle>{item.boardTitle}</SubTitle>
          <Body>{item.boardContent.substring(0, 20)}</Body>
        </ContentBox>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 386px;
  height: 136px;
  background: ${({ theme }) => theme.colors.gray.gray200};
  flex-direction: column;

  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 10px;
  margin-top: 12px;

  @media (max-width: ${1870}px) {
    width: 100%;
    gap: 10px;
  }

  @media (max-width: ${1295}px) {
    width: 100%;
  }
`;
const Header = styled.div`
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  margin-left: 23px;
  margin-right: 20px;
`;

const Title = styled.span`
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.gray.gray400};
`;
const Content = styled.div`
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 13px;
  margin-left: 23px;
  margin-right: 20px;
  margin-bottom: 18px;
`;
const BookMark = styled(BsBookmark)`
  color: ${({ theme }) => theme.colors.gray.gray400};
`;
const BookMarkFill = styled(BsFillBookmarkFill)`
  color: ${({ theme }) => theme.colors.primary.default};
`;
const TechBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;

  background: ${({ theme }) => theme.colors.sub};

  box-shadow: 0px 0px 20px rgba(143, 146, 148, 0.1);
  border-radius: 10px;

  color: #ffffff;
`;
const ContentBox = styled.div`
  display: flex;
  margin-left: 22px;

  flex-direction: column;
`;
const SubTitle = styled.span`
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 23px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.gray.gray950};
`;
const Body = styled.span`
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.gray.gray400};
  font-size: 14px;
  line-height: 20px;

  color: ${({ theme }) => theme.colors.gray.gray400};
`;
const Circle = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  top: -3px;
  left: -3px;

  background: #ff4b4b;
  border: 2px solid #fefefe;
  border-radius: 10px;
  box-sizing: border-box;
`;

export default CommunityBox;
