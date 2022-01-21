import DIText from '@src/components/Atoms/DIText';
import React from 'react';
import styled from 'styled-components';
import ToggleSwitch from '../../Atoms/DIToggleSwitch';

const Setting = () => {
  return (
    <Container>
      <DIText fontColor="#18171c" fontWeight={400} fontSize={25} style={{ margin: '15px 0' }}>
        알림 설정
      </DIText>
      <Content>
        <div>
          <DIText fontColor="#18171c" fontWeight={400} fontSize={20} style={{ padding: '10px 0' }}>
            게시물 알림
          </DIText>
          <DIText fontColor="#8F9294" fontSize={16} fontWeight={400}>
            멘션과 댓글에 대한 푸시 알림을 받으세요.
          </DIText>
        </div>
        <ToggleSwitch />
      </Content>
      <Content>
        <div>
          <DIText fontColor="#18171c" fontWeight={400} fontSize={20} style={{ padding: '10px 0' }}>
            일정 알림
          </DIText>
          <DIText fontColor="#8F9294" fontSize={16} fontWeight={400}>
            다가오는 일정, 투두리스트의 알림을 받으세요.
          </DIText>
        </div>
        <ToggleSwitch />
      </Content>
      <Content>
        <div>
          <DIText fontColor="#18171c" fontWeight={400} fontSize={20} style={{ padding: '10px 0' }}>
            이메일 알림
          </DIText>
          <DIText fontColor="#8F9294" fontSize={16} fontWeight={400}>
            모든 페이지의 멘션, 댓글 및 편집에 대한 업데이트를 이메일로 받으세요.
          </DIText>
        </div>
        <ToggleSwitch />
      </Content>
      <Content>
        <div>
          <DIText fontColor="#18171c" fontWeight={400} fontSize={20} style={{ padding: '10px 0' }}>
            모든 알림 비활성화
          </DIText>
          <DIText fontColor="#8F9294" fontSize={16} fontWeight={400}>
            모든 알림을 받지 않습니다.
          </DIText>
        </div>
        <ToggleSwitch />
      </Content>

      <DIText fontColor="#18171c" fontWeight={400} fontSize={25} style={{ margin: '50px 0' }}>
        계정 설정
      </DIText>

      <Content>
        <div>
          <DIText fontColor="#18171c" fontWeight={400} fontSize={20} style={{ padding: '10px 0' }}>
            테마 설정
          </DIText>
          <DIText fontColor="#8F9294" fontSize={16} fontWeight={400}>
            라이트모드, 다크모드
          </DIText>
        </div>
      </Content>
      <Content>
        <div>
          <DIText fontColor="#18171c" fontWeight={400} fontSize={20} style={{ padding: '10px 0' }}>
            모든 기기에서 로그아웃
          </DIText>
          <DIText fontColor="#8F9294" fontSize={16} fontWeight={400}>
            현재 세션을 제외한 모든 활성 세션에서 로그아웃되면 다시 로그인 해야합니다.
          </DIText>
        </div>
      </Content>
      <Content>
        <div>
          <DIText fontColor="#18171c" fontWeight={400} fontSize={20} style={{ padding: '10px 0' }}>
            내 계정 삭제
          </DIText>
          <DIText fontColor="#8F9294" fontSize={16} fontWeight={400}>
            현재 세션을 제외한 모든 활성 세션에서 로그아웃되면 다시 로그인 해야합니다.
          </DIText>
        </div>
      </Content>
    </Container>
  );
};

export default Setting;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 40px 0;
  border-bottom: 1px solid #eaeaea;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
