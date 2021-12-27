import DIText from '@src/components/Atoms/DIText';
import React from 'react';
import styled from 'styled-components';
import { HiOutlinePlus } from 'react-icons/hi';
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

      {/* {requiredLogin && <LoginWrapper></LoginWrapper>} */}
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
  width: 50%;
  min-width: 200px;
  height: 200px;
  top: 30%;
  background-color: ${({ theme }) => theme.colors.background};
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

const Title = styled(DIText)``;
const PlusIcon = styled(HiOutlinePlus)`
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
export default ContentBox;
