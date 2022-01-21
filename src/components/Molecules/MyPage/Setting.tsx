import DIButton from '@src/components/Atoms/DIButton';
import DIText from '@src/components/Atoms/DIText';
import { devices } from '@src/utils/theme';
import React, { useCallback, useState } from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';
import ToggleSwitch from '../../Atoms/DIToggleSwitch';

const Setting = () => {
  const [toggle, setToggle] = useState<{
    mention: boolean;
    notification: boolean;
    email: boolean;
    schedule: boolean;
  }>({
    mention: false,
    notification: false,
    email: false,
    schedule: false,
  });
  const onChangeToggle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;
      setToggle({
        ...toggle,
        [name]: checked,
      });
      console.log([name], checked);
    },
    [toggle],
  );
  return (
    <Container>
      <DIText fontColor="#18171c" fontWeight={400} fontSize={25}>
        알림 설정
      </DIText>
      <Content>
        <TextContainer>
          <DIText fontColor="#18171c" fontWeight={400} fontSize={20} style={{ padding: '10px 0' }}>
            게시물 알림
          </DIText>
          <DIText fontColor="#8F9294" fontSize={16} fontWeight={400}>
            멘션과 댓글에 대한 푸시 알림을 받으세요.
          </DIText>
        </TextContainer>
        <ToggleSwitch name="mention" value={toggle.mention} onChange={onChangeToggle} />
      </Content>
      <Content>
        <TextContainer>
          <DIText fontColor="#18171c" fontWeight={400} fontSize={20} style={{ padding: '10px 0' }}>
            일정 알림
          </DIText>
          <DIText fontColor="#8F9294" fontSize={16} fontWeight={400}>
            다가오는 일정, 투두리스트의 알림을 받으세요.
          </DIText>
        </TextContainer>
        <ToggleSwitch name="schedule" value={toggle.schedule} onChange={onChangeToggle} />
      </Content>
      <Content>
        <TextContainer>
          <DIText fontColor="#18171c" fontWeight={400} fontSize={20} style={{ padding: '10px 0' }}>
            이메일 알림
          </DIText>
          <DIText fontColor="#8F9294" fontSize={16} fontWeight={400}>
            모든 페이지의 멘션, 댓글 및 편집에 대한 업데이트를 이메일로 받으세요.
          </DIText>
        </TextContainer>
        <ToggleSwitch name="email" value={toggle.email} onChange={onChangeToggle} />
      </Content>
      <Content>
        <TextContainer>
          <DIText fontColor="#18171c" fontWeight={400} fontSize={20} style={{ padding: '10px 0' }}>
            모든 알림 비활성화
          </DIText>
          <DIText fontColor="#8F9294" fontSize={16} fontWeight={400}>
            모든 알림을 받지 않습니다.
          </DIText>
        </TextContainer>
        <ToggleSwitch name="notification" value={toggle.notification} onChange={onChangeToggle} />
      </Content>

      <DIText fontColor="#18171c" fontWeight={400} fontSize={25} style={{ marginTop: '20px' }}>
        계정 설정
      </DIText>

      <Content>
        <TextContainer>
          <DIText fontColor="#18171c" fontWeight={400} fontSize={20} style={{ padding: '10px 0' }}>
            테마 설정
          </DIText>
          <DIText fontColor="#8F9294" fontSize={16} fontWeight={400}>
            라이트모드, 다크모드
          </DIText>
        </TextContainer>
        <span>
          <DIButton borderRadius={51} backgroundColor="#AACD06" onClick={() => {}} color="#fff">
            라이트모드
          </DIButton>
          <DIButton borderRadius={51} backgroundColor="#353535" onClick={() => {}} color="#fff">
            다크모드
          </DIButton>
        </span>
      </Content>
      <Content>
        <TextContainer>
          <DIText fontColor="#18171c" fontWeight={400} fontSize={20} style={{ padding: '10px 0' }}>
            모든 기기에서 로그아웃
          </DIText>
          <DIText fontColor="#8F9294" fontSize={16} fontWeight={400}>
            현재 세션을 제외한 모든 활성 세션에서 로그아웃되면 다시 로그인 해야합니다.
          </DIText>
        </TextContainer>
        <DIButton backgroundColor="#fff" borderRadius={51} borderColor="#FF4B4B" color="#FF4B4B" onClick={() => {}}>
          로그아웃
        </DIButton>
      </Content>
      <Content>
        <TextContainer>
          <DIText fontColor="#18171c" fontWeight={400} fontSize={20} style={{ padding: '10px 0' }}>
            내 계정 삭제
          </DIText>
          <DIText fontColor="#8F9294" fontSize={16} fontWeight={400}>
            현재 세션을 제외한 모든 활성 세션에서 로그아웃되면 다시 로그인 해야합니다.
          </DIText>
        </TextContainer>
        <DIButton backgroundColor="#fff" borderRadius={51} borderColor="#FF4B4B" color="#FF4B4B" onClick={() => {}}>
          내 계정 삭제
        </DIButton>
      </Content>
      <div>
        <DIButton color="#fff" backgroundColor="#AACD06" borderRadius={51} onClick={() => {}}>
          내 프로필 저장
        </DIButton>
      </div>
    </Container>
  );
};

export default Setting;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;

  & > div {
    margin-left: auto;
    padding: 50px 0;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid #eaeaea;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  @media ${devices.laptop} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
