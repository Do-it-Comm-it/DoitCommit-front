import DIText from '@src/components/Atoms/DIText';
import React, { useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import { HiOutlinePlus } from 'react-icons/hi';
import { MdOutlineLockOpen } from 'react-icons/md';
import DIButton from '../Atoms/DIButton';
import { modalAtom } from '@src/recoil/atom/modal';
import { useSetRecoilState } from 'recoil';
type Props = {
  requiredHeader?: boolean;
  title?: string;
  contentWidth?: number;
  contentHeight?: number;
  minHeight?: number;
  children?: React.ReactElement;
  onClick?: () => void;
  requiredLogin?: boolean;
};

const ContentBox: React.FC<Props> = ({
  requiredHeader,
  requiredLogin,
  title,
  contentWidth,
  contentHeight,
  minHeight,
  children,
  onClick,
}: Props) => {
  const theme = useTheme();
  const setModal = useSetRecoilState(modalAtom);
  const onClickLogin = useCallback(() => {
    setModal({ id: 'login', visible: true });
  }, [setModal]);

  return (
    <Container contentWidth={contentWidth} contentHeight={contentHeight}>
      {requiredHeader && (
        <HeaderWrapper>
          <Title>{title}</Title>
          <PlusIcon size={16} onClick={onClick} />
        </HeaderWrapper>
      )}

      <ContentWrapper
        contentWidth={contentWidth}
        contentHeight={contentHeight}
        minHeight={minHeight}
        requiredLogin={requiredLogin}
      >
        {children}
      </ContentWrapper>

      {requiredLogin && (
        <LoginWrapper>
          <OpacityBox />
          <Content>
            <LoginHeader>
              <LockIcon />
              <Title fontSize={20}>로그인 후 이용가능합니다.</Title>
              <SubTitle fontSize={14} fontColor={theme.colors.sub2}>
                회원가입 후 더 많은 서비스를 이용 해 보세요
              </SubTitle>
            </LoginHeader>

            <LoginButton value={'로그인 하기'} borderRadius={60} onClick={onClickLogin} />
          </Content>
        </LoginWrapper>
      )}
    </Container>
  );
};

const Container = styled.div<{ contentWidth?: number; contentHeight?: number }>`
  display: flex;
  position: relative;
  flex-direction: column;
  width: ${({ contentWidth }) => (contentWidth ? `${contentWidth}px` : `100%`)};
  height: ${({ contentHeight }) => (contentHeight ? `${contentHeight}px` : `100%`)};
  padding-right: 16px;
  justify-content: space-between;
`;

const LoginWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  min-width: 80px;
  width: 50%;
  height: 50%;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.5);
  background: transparent;
`;
const OpacityBox = styled.div`
  opacity: 0.2;
  background-color: ${({ theme }) => theme.colors.background};
`;
const Content = styled.div`
  height: 200px;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
const Title = styled(DIText)``;
const SubTitle = styled(DIText)``;
const LoginButton = styled(DIButton)``;
const PlusIcon = styled(HiOutlinePlus)`
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
const LockIcon = styled(MdOutlineLockOpen)``;
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const LoginHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ContentWrapper = styled.div<{
  contentWidth?: number;
  contentHeight?: number;
  minHeight?: number;
  maxHeight?: number;
  requiredLogin?: boolean;
}>`
  display: flex;
  width: 100%;
  min-height: ${({ minHeight }) => minHeight}px;
  height: 100%;
  flex-direction: column;
  max-width: ${({ contentWidth }) => (contentWidth ? `${contentWidth}px` : `100%`)};
  height: ${({ contentHeight }) => (contentHeight ? `${contentHeight}px` : `100%`)};
  background-color: ${({ theme }) => theme.colors.background};
  margin-top: 16px;

  ${({ requiredLogin }) => `
    filter: blur(${requiredLogin ? 10 : 0}px)
  `}
`;

export default ContentBox;
