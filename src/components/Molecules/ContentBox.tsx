import DIText from '@src/components/Atoms/DIText';
import React from 'react';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';
type Props = {
  requiredHeader?: boolean;
  title?: string;
  contentWidth?: number;
  contentHeight?: number;
  minHeight?: number;
  children?: React.ReactElement;
};

const ContentBox: React.FC<Props> = ({
  requiredHeader,
  title,
  contentWidth,
  contentHeight,
  minHeight,
  children,
}: Props) => {
  return (
    <Container contentWidth={contentWidth} contentHeight={contentHeight}>
      {requiredHeader && (
        <HeaderWrapper>
          <Title>{title}</Title>
          <PlusIcon size={12} />
        </HeaderWrapper>
      )}

      <ContentWrapper contentHeight={contentHeight} minHeight={minHeight}>
        {children}
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div<{ contentWidth?: number; contentHeight?: number }>`
  display: flex;
  flex-direction: column;
  width: ${({ contentWidth }) => (contentWidth ? `${contentWidth}px` : `100%`)};
  height: ${({ contentHeight }) => (contentHeight ? `${contentHeight}px` : `100%`)};
  padding-right: 16px;
  justify-content: space-between;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const ContentWrapper = styled.div<{ contentHeight?: number; minHeight?: number }>`
  display: flex;
  width: 100%;
  min-height: ${({ minHeight }) => minHeight}px;
  height: 100%;
  flex-direction: column;
  height: ${({ contentHeight }) => (contentHeight ? `${contentHeight}px` : `100%`)};
  background-color: ${({ theme }) => theme.colors.background};
  margin-top: 16px;
`;
const Title = styled(DIText)``;
const PlusIcon = styled(AiOutlinePlus)``;
export default ContentBox;
