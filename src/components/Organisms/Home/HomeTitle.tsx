import DIText from '@src/components/Atoms/DIText';
import { userAtom } from '@src/recoil/atom/user';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled, { useTheme } from 'styled-components';

const HomeTitle = () => {
  const user = useRecoilValue(userAtom);
  const theme = useTheme();
  return (
    <Container>
      <Title fontSize={30} fontFamily={theme.font.EliceDigitalBaeumBold}>
        Hello
      </Title>
      <Name fontSize={30} fontFamily={theme.font.EliceDigitalBaeumBold} fontColor={theme.colors.main}>
        {' '}
        {user?.nickname ?? `Stranger`}
      </Name>
      <Sub
        fontSize={20}
        fontFamily={theme.font.NotoSansKRRegular}
        style={{
          paddingLeft: 18,
          paddingTop: 10,
        }}
      >
        지금 두잇커밋과 함께 commit하세요!
      </Sub>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 30px;
`;

const Title = styled(DIText)``;
const Sub = styled(DIText)``;
const Name = styled(DIText)``;
export default HomeTitle;
