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
  children?: React.ReactElement | React.ReactElement[];
  onClick?: () => void;
  requiredLogin?: boolean;
};

const ContentBox: React.FC<Props> = ({
  requiredHeader,
  requiredLogin,
  title,
  contentWidth,
  contentHeight,
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
          <Title
            fontFamily={theme.font.NotoSansKRRegular}
            fontSize={20}
            lineHeight={29}
            fontColor={theme.colors.gray.gray950}
          >
            {title}
          </Title>
          <PlusIcon
            size={16}
            onClick={onClick}
            color={theme.colors.gray.gray950}
          />
        </HeaderWrapper>
      )}

      <ContentWrapper requiredLogin={requiredLogin}>{children}</ContentWrapper>

      {requiredLogin && (
        <LoginWrapper>
          <OpacityBox />
          <Content>
            <LoginHeader>
              <LockIcon />
              <Title fontSize={20} fontColor={theme.colors.gray.gray950}>
                로그인 후 이용가능합니다.
              </Title>
              <SubTitle fontSize={14} fontColor={theme.colors.gray.gray400}>
                회원가입 후 더 많은 서비스를 이용 해 보세요
              </SubTitle>
            </LoginHeader>

            <LoginButton
              value={'로그인 하기'}
              borderRadius={60}
              onClick={onClickLogin}
              backgroundColor={theme.colors.primary.default}
              borderColor={theme.colors.primary.default}
            />
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
  height: ${({ contentHeight }) =>
    contentHeight ? `${contentHeight}px` : `100%`};
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
  max-width: 500px;
  width: 70%;
  height: 50%;
  min-height: 200px;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background: ${({ theme }) => theme.colors.gray.gray155};
`;
const OpacityBox = styled.div`
  opacity: 0.2;
  background-color: ${({ theme }) => theme.colors.gray.gray100};
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
  margin: 0px 5px;
`;
const LoginHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const ContentWrapper = styled.div<{
  requiredLogin?: boolean;
}>`
  display: flex;
  flex-direction: column;
  filter: ${({ requiredLogin }) => `
    blur(${requiredLogin ? 10 : 0}px)
  `};
  justify-content: center;
  align-items: center;

  ${({ requiredLogin }) => requiredLogin && 'pointer-events : none'};
  ${({ requiredLogin }) => requiredLogin && 'user-select: none'};
`;

export default ContentBox;
