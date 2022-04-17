import React from 'react';
import GoogleLogin from '../GoogleLogin';
import GithubLogin from '../GithubLogin';
import styled, { useTheme } from 'styled-components';
import CloseIcon from '@src/assets/close_button.svg';
import DIText from '@src/components/Atoms/DIText';
import Divider from '@src/components/Atoms/Divider';
import ModalContainer from '@src/components/Molecules/ModalContainer';
import { devices } from '@src/utils/theme';
type LoginModalProps = {
  onClose: () => void;
  stopPropagation: (e: any) => void;
  width?: number;
  height?: number;
};

const LoginModal = ({
  onClose,
  stopPropagation,
  width,
  height,
}: LoginModalProps) => {
  const theme = useTheme();
  return (
    <ModalContainer
      width={width}
      height={height}
      onClose={onClose}
      stopPropagation={stopPropagation}
      backgroundColor={theme.colors.gray.gray150}
    >
      <Container>
        <Header>
          <CloseModalButton onClick={onClose} />
        </Header>
        <Divider />

        <Content>
          <HeaderTitle
            style={{ paddingBottom: 14 }}
            fontSize={28}
            fontFamily={theme.font.NotoSansKRBold}
            fontColor={theme.colors.gray.gray950}
          >
            안녕하세요!
          </HeaderTitle>
          <HeaderDescription
            fontSize={16}
            fontFamily={theme.font.NotoSansKRLight}
            fontColor={theme.colors.gray.gray950}
          >
            오늘도 두잇커밋과 함께 목표에
            <Line> 한발짝 가까워졌습니다.</Line>
          </HeaderDescription>
          <GoogleLogin />
          <GithubLogin />
        </Content>
      </Container>
    </ModalContainer>
  );
};
const HeaderTitle = styled(DIText)``;
const HeaderDescription = styled(DIText)``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 0 20px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const CloseModalButton = styled(CloseIcon)`
  width: 25px;
  margin-left: auto;
  color: ${({ theme }) => theme.colors.gray.gray950};
  cursor: pointer;
`;
const HelpContent = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Line = styled.span`
  color: ${({ theme }) => theme.colors.gray.gray950};
  @media ${devices.tablet} {
    display: block;
  }
`;
export default LoginModal;
