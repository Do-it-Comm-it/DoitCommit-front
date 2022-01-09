import ProfileArea from '@src/components/Organisms/MyPage/ProfileArea';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import ProfileFormArea from '@src/components/Organisms/MyPage/ProfileFormArea';
import DIText from '@src/components/Atoms/DIText';
const MyPage = () => {
  const theme = useTheme();
  return (
    <Container>
      <DIText fontWeight={700} fontColor={theme.colors.dark.a7} fontSize={30} style={{ paddingBottom: '20px' }}>
        마이페이지
      </DIText>
      <Content>
        <ProfileArea />
        <ProfileFormArea />
      </Content>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 70px;
  min-height: 702px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  max-height: 702px;
`;

export default MyPage;
