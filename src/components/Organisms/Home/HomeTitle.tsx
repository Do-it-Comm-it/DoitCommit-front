import DIText from '@src/components/Atoms/DIText';
import { useUser } from '@src/hooks/useAuthentication';
import useDiffDate from '@src/hooks/useDiffDate';
import { devices } from '@src/utils/theme';
import React from 'react';
import styled, { useTheme } from 'styled-components';

const HomeTitle = () => {
  //TODO: 사용자 생성날짜 필요.
  const { data: user } = useUser();
  const theme = useTheme();
  const diffDate = useDiffDate(user ? new Date(user?.regDate!) : new Date());

  return (
    <Container>
      <Title
        fontSize={30}
        fontFamily={theme.font.NotoSansKRBold}
        fontColor={theme.colors.gray.gray950}
        fontWeight={700}
      >
        {/* {user?.nickname ?? `Stranger`}님!{'  '}
        {user?.nickname
          ? `두잇커밋과 함께한지, ${diffDate}일째 입니다.`
          : `두잇커밋에 어서오세요!`} */}
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
const Name = styled(DIText)``;
export default HomeTitle;
