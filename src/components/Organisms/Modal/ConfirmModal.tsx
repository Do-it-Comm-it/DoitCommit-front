import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Container, ContentRow, Header } from '@src/components/Atoms/Modal';
import Divider from '@src/components/Atoms/Divider';
import DIButton from '@src/components/Atoms/DIButton';
import ModalContainer from '@src/components/Molecules/ModalContainer';

interface Props {
  onClose: () => void;
  onConfirm: () => void;
  width?: number;
  height?: number;
  title: string;
  content?: string;
}

const ConfirmModal = ({
  title,
  onClose,
  onConfirm,
  width,
  height,
  content,
}: Props) => {
  const theme = useTheme();

  return (
    <ModalContainer
      width={width}
      height={height}
      onClose={onClose}
      stopPropagation={(e) => {
        e.stopPropagation();
      }}
    >
      <Container>
        <Header>
          <HeaderTitle>{title}</HeaderTitle>
        </Header>
        <Content>
          <ContentRow>{content}</ContentRow>
        </Content>
        <Divider />
        <ContentRow
          alignItems="center"
          justifyContent="center"
          padding="20px 0"
        >
          <DIButton
            onClick={onClose}
            backgroundColor="#353535"
            borderRadius={51}
            borderColor="#353535"
            style={{
              marginRight: '10px',
            }}
          >
            취소
          </DIButton>
          <DIButton
            onClick={onConfirm}
            backgroundColor={theme.colors.primary.default}
            borderRadius={51}
          >
            확인
          </DIButton>
        </ContentRow>
      </Container>
    </ModalContainer>
  );
};

const HeaderTitle = styled.span`
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-size: 20px;
  line-height: 32px;
  color: #353535;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px 0;
`;

export default ConfirmModal;
