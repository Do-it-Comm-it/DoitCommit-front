import DIButton from '@src/components/Atoms/DIButton';
import DIText from '@src/components/Atoms/DIText';
import { devices } from '@src/utils/theme';
import React, { useCallback, useState } from 'react';
import { ChangeEvent } from 'react';
import styled, { useTheme } from 'styled-components';
import ToggleSwitch from '../../Atoms/DIToggleSwitch';
import LightModeIcon from '@src/assets/lightmode.svg';
import DarkModeIcon from '@src/assets/darkmode.svg';
import useDarkMode from '@src/hooks/useDarkMode';

const Setting = () => {
  const theme = useTheme();
  const { toggleLight, toggleDark } = useDarkMode();

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
    },
    [toggle]
  );
  return (
    <Container>
      <DIText
        fontColor={theme.colors.gray.gray950}
        fontWeight={600}
        fontSize={24}
      >
        알림 설정
      </DIText>
      <Content>
        <TextContainer>
          <DIText
            fontColor={theme.colors.gray.gray950}
            fontWeight={400}
            fontSize={20}
            style={{
              paddingBottom: 16,
            }}
          >
            모든 알림 비활성화
          </DIText>
          <DIText
            fontColor={theme.colors.gray.gray400}
            fontSize={16}
            fontWeight={400}
          >
            모든 알림을 받지 않습니다.
          </DIText>
        </TextContainer>
        <ToggleSwitch
          name="mention"
          value={toggle.mention}
          onChange={onChangeToggle}
        />
      </Content>
      <Content>
        <TextContainer>
          <DIText
            fontColor={theme.colors.gray.gray950}
            fontWeight={400}
            fontSize={20}
            style={{
              paddingBottom: 16,
            }}
          >
            아티클 알림
          </DIText>
          <DIText
            fontColor={theme.colors.gray.gray400}
            fontSize={16}
            fontWeight={400}
          >
            멘션과 댓글에 대한 푸시 알림을 받으세요.
          </DIText>
        </TextContainer>
        <ToggleSwitch
          name="schedule"
          value={toggle.schedule}
          onChange={onChangeToggle}
        />
      </Content>
      <Content>
        <TextContainer>
          <DIText
            fontColor={theme.colors.gray.gray950}
            fontWeight={400}
            fontSize={20}
            style={{
              paddingBottom: 16,
            }}
          >
            일정 알림
          </DIText>
          <DIText
            fontColor={theme.colors.gray.gray400}
            fontSize={16}
            fontWeight={400}
          >
            다가오는 일정, 투두리스트의 알림을 받으세요.
          </DIText>
        </TextContainer>
        <ToggleSwitch
          name="email"
          value={toggle.email}
          onChange={onChangeToggle}
        />
      </Content>

      <DIText
        fontColor={theme.colors.gray.gray950}
        fontSize={25}
        fontWeight={600}
      >
        계정 설정
      </DIText>

      <Content>
        <TextContainer>
          <DIText
            fontColor={theme.colors.gray.gray950}
            fontWeight={400}
            fontSize={20}
            style={{
              paddingBottom: 16,
            }}
          >
            테마 설정
          </DIText>
          <DIText
            fontColor={theme.colors.gray.gray400}
            fontSize={16}
            fontWeight={400}
          >
            라이트모드, 다크모드
          </DIText>
        </TextContainer>
        <span>
          <DIButton
            borderRadius={51}
            backgroundColor={theme.colors.primary.default}
            onClick={toggleLight}
            borderColor={theme.colors.primary.default}
          >
            <ButtonTextContainer>
              라이트모드 <LightModeIcon />
            </ButtonTextContainer>
          </DIButton>
          <DIButton
            borderRadius={51}
            backgroundColor={theme.colors.gray.gray600}
            borderColor={theme.colors.gray.gray600}
            onClick={toggleDark}
          >
            다크모드 <DarkModeIcon />
          </DIButton>
        </span>
      </Content>

      <Content>
        <TextContainer>
          <DIText
            fontColor={theme.colors.gray.gray950}
            fontWeight={400}
            fontSize={20}
            style={{
              paddingBottom: 16,
            }}
          >
            내 계정 삭제
          </DIText>
          <DIText
            fontColor={theme.colors.gray.gray400}
            fontSize={16}
            fontWeight={400}
          >
            탈퇴 7일 후 완전 삭제 됩니다.
          </DIText>
        </TextContainer>
        <DIButton
          borderRadius={50}
          backgroundColor="transparent"
          borderColor={theme.colors.warning}
          color={theme.colors.warning}
          onClick={() => {}}
          height={50}
        >
          내 계정 삭제
        </DIButton>
      </Content>

      <DIButton
        borderRadius={51}
        backgroundColor={theme.colors.gray.gray100}
        borderColor={theme.colors.gray.gray100}
        color={theme.colors.gray.gray400}
        onClick={() => {}}
      >
        로그아웃
      </DIButton>

      <DIButton
        color={theme.colors.white}
        backgroundColor={theme.colors.primary.default}
        borderColor={theme.colors.primary.default}
        borderRadius={51}
        onClick={() => {}}
      >
        시스템 저장
      </DIButton>
    </Container>
  );
};

export default Setting;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;

  & > button {
    margin: 20px 0;
    margin-left: auto;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.gray200};
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;

  & > span > button {
    margin-right: 15px;
  }

  @media ${devices.laptop} {
    flex-direction: column;
    align-items: flex-start;
    padding: 30px 0;

    & > div > pre {
      padding: 10px 0;
    }
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media ${devices.tablet} {
    & > pre {
      white-space: pre-wrap;
    }
  }
`;

const ButtonTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
