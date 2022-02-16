import React from 'react';
import styled from 'styled-components';
import { BsFillBookmarkFill, BsBookmark } from 'react-icons/bs';
type CommunityBoxProps = {
  title: string;
  subTitle: string;
  body: string;
  tech: string;
  isMarked: boolean;
};

const CommunityBox = ({ title, subTitle, body, tech, isMarked }: CommunityBoxProps) => {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        {isMarked ? <BookMark /> : <BookMarkFill />}
      </Header>
      <Content>
        <TechBox>
          <Circle />
          {tech}
        </TechBox>
        <ContentBox>
          <SubTitle>{subTitle}</SubTitle>
          <Body>{body}</Body>
        </ContentBox>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 386px;
  height: 136px;
  background: ${({ theme }) => theme.colors.background};
  flex-direction: column;

  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 10px;
  margin-top: 12px;

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
  color: ${({ theme }) => theme.colors.dark.a3};
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
  color: ${({ theme }) => theme.colors.dark.a3};
`;
const BookMarkFill = styled(BsFillBookmarkFill)`
  color: ${({ theme }) => theme.colors.main};
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
  color: ${({ theme }) => theme.colors.dark.a7};
`;
const Body = styled.span`
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.dark.a3};
  font-size: 14px;
  line-height: 20px;

  color: ${({ theme }) => theme.colors.dark.a3};
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
