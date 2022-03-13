import DIText from '@src/components/Atoms/DIText';
import React from 'react';
import styled, { useTheme } from 'styled-components';

const CommentBox = () => {
  const theme = useTheme();
  return (
    <Container>
      <Left>
        <Profile src="https://avatars.githubusercontent.com/u/65433256?v=4" alt="user_profile" />
      </Left>
      <Right>
        <Header>
          <DIText fontColor={theme.colors.dark.a7} fontWeight={350} fontSize={20}>
            월급루팡
          </DIText>
          <DIText fontColor={theme.colors.dark.a10} fontWeight={400} fontSize={16}>
            Feb.17.2022
          </DIText>
        </Header>
        <DIText fontColor={theme.colors.dark.a10} fontWeight={350} fontSize={20}>
          사업 전략을 충분히 고민하지 않고 생산성에만 집중하는 디자이너가 되지 않도록 주의 합니다. 생각 없이 디자인 하는
          경험이 쌓인 경력자가 되지 않도록.
        </DIText>
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

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 16px;
`;
