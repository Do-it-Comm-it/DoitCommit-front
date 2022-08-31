import DIText from '@src/components/Atoms/DIText';
import { devices } from '@src/utils/theme';
import React from 'react';
import styled, { useTheme } from 'styled-components';

const HomeTitle = () => {
  //TODO: 사용자 생성날짜 필요.
  const theme = useTheme();
  return (
    <Container>
      <Title
        fontSize={30}
        fontFamily={theme.font.NotoSansKRBold}
        fontColor={theme.colors.gray.gray950}
        fontWeight={700}
      >
        공유 커뮤니티 두잇! 환영합니다.
      </Title>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 16px;

  @media ${devices.tablet} {
    width: 100%;
    align-items: flex-start;
    flex-direction: column;
  }
`;

const Title = styled(DIText)``;
export default HomeTitle;
