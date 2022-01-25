import React from 'react';
import GoogleLogin from '../GoogleLogin';
import GithubLogin from '../GithubLogin';
import styled, { useTheme } from 'styled-components';
import CloseIcon from '@src/assets/close_button.svg';
import DIText from '@src/components/Atoms/DIText';
import Divider from '@src/components/Atoms/Divider';
import { CreateModal } from '@src/components/Atoms/Modal';
type LoginModalProps = {
  onClose: () => void;
  stopPropagation: (e: any) => void;
};

const LoginModal = ({ onClose, stopPropagation }: LoginModalProps) => {
  const theme = useTheme();

  return (
    <CreateModal onClick={onClose}>
      <div onClick={stopPropagation}>
        <Container>
          <Header>
            <CloseModalButton onClick={onClose} />
          </Header>
          <Divider />

          <Content>
            <HeaderTitle style={{ paddingBottom: 14 }} fontSize={28} fontFamily={theme.font.NotoSansKRBold}>
              안녕하세요!
            </HeaderTitle>
            <HeaderDescription fontSize={16} fontFamily={theme.font.NotoSansKRLight}>
              오늘도 두잇커밋과 함께 목표에 한발짝 가까워졌습니다.
            </HeaderDescription>
            <GoogleLogin />
            <GithubLogin />
            <HelpContent>
              <HelpText fontColor={theme.colors.dark.a4} fontSize={14}>
                회원 정보를 잊으셧나요?
              </HelpText>
              <Link
                fontColor={theme.colors.dark.a4}
                fontSize={14}
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
              >
                계정찾기
              </Link>
            </HelpContent>
          </Content>
        </Container>
      </div>
    </CreateModal>
  );
};
const HeaderTitle = styled(DIText)``;
const HeaderDescription = styled(DIText)``;
const HelpText = styled(DIText)``;
const Link = styled(DIText)``;
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
  color: ${({ theme }) => theme.colors.dark};
  cursor: pointer;
`;
const HelpContent = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export default LoginModal;
