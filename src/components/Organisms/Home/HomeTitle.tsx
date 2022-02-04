import DIText from '@src/components/Atoms/DIText';
import { userAtom } from '@src/recoil/atom/user';
import { devices } from '@src/utils/theme';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled, { useTheme } from 'styled-components';

const HomeTitle = () => {
  //TODO: 사용자 생성날짜 필요.
  const user = useRecoilValue(userAtom);
  const theme = useTheme();
  return (
    <Container>
      <Title fontSize={30} fontFamily={theme.font.NotoSansKRBold}>
        {user?.nickname ?? `Stranger`}님!{'  '}
      </Title>
      <Name fontSize={30} fontFamily={theme.font.NotoSansKRRegular}>
        {user?.nickname ? `두잇커밋과 함께한지, ${0}일째 입니다.` : `두잇커밋에 어서오세요!`}
      </Name>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 30px;

  @media ${devices.tablet} {
    width: 100%;
    align-items: flex-start;
    flex-direction: column;
  }
`;

const Title = styled(DIText)``;
const Name = styled(DIText)``;
export default HomeTitle;
