import ProfileArea from '@src/components/Organisms/MyPage/ProfileArea';
import DIText from '@src/components/Atoms/DIText';
import React from 'react';
import styled, { useTheme } from 'styled-components';
const MyPage = () => {
  const theme = useTheme();
  return (
    <Container>
      <Content>
        <DIText fontFamily={theme.font.EliceDigitalBaeumRegular} fontWeight={700} fontSize={30}>
          나의 두잇 프로필
        </DIText>
        <ProfileArea />
        <BtnArea>
          <button>회원정보 수정</button>
        </BtnArea>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  max-width: 1920px;
  width: 100%;
  padding-top: 70px;
`;
const Content = styled.div`
  background-color: #ffffff;
  padding: 40px;
  width: 90%;
  margin: 0 auto;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
`;

const BtnArea = styled.div`
  text-align: center;
  margin-top: 14px;

  & > button {
    margin: 0 auto;
    font-size: 20px;
    color: #ffffff;
    border: 0 none;
    background: #aacd06;
    border-radius: 7px;
    width: 224px;
    height: 66px;
  }
`;
export default MyPage;
