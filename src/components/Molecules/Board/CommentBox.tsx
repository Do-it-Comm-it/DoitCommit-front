import React from 'react';
import styled from 'styled-components';

const CommentBox = () => {
  return (
    <Container>
      <Left>
        <Profile src="https://avatars.githubusercontent.com/u/65433256?v=4" alt="user_profile" />
      </Left>
      <Right>
        <Header>
          <Author>월급루팡</Author>
          <Date>Feb.17.2022</Date>
        </Header>
        <Content>
          사업 전략을 충분히 고민하지 않고 생산성에만 집중하는 디자이너가 되지 않도록 주의 합니다. 생각 없이 디자인 하는
          경험이 쌓인 경력자가 되지 않도록.
        </Content>
      </Right>
    </Container>
  );
};

export default CommentBox;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-top: 1px solid #e0e1e4;
  padding: 44px 0;
`;

const Profile = styled.img`
  width: 69px;
  height: 69px;
  border-radius: 10px;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Left = styled.div`
  display: flex;
  width: 30%;
  align-items: center;
  justify-content: center;
  padding: 0 50px;
`;

const Author = styled.span`
  color: ${({ theme }) => theme.colors.dark.a7};
  font-weight: 350;
  font-size: 20px;
`;

const Date = styled.span`
  font-weight: 400;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.dark.a10};
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 16px;
`;

const Content = styled.span`
  font-weight: 350;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.dark.a10};
`;
