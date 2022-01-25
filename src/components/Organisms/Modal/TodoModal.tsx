import React from 'react';
import styled from 'styled-components';
import NotiIconSVG from '@src/assets/notification.svg';
import { Container, ContentRow, CreateModal, Header } from '@src/components/Atoms/Modal';
import TagContainer from '@src/components/Molecules/TodoModal/TagContainer';
import TextAreaContainer from '@src/components/Molecules/TodoModal/TextAreaContainer';
import Divider from '@src/components/Atoms/Divider';
import DIButton from '@src/components/Atoms/DIButton';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';

interface Props {
  onClose: () => void;
  stopPropagation: (e: any) => void;
}
const TodoModal = ({ onClose, stopPropagation }: Props) => {
  const [modal, setModal] = useRecoilState(modalAtom);
  return (
    <CreateModal onClick={onClose} width={772} height={647}>
      <div onClick={stopPropagation}>
        <Container>
          <Header>
            <Input onChange={() => {}} placeholder="제목 없음" />
            <NotiIcon />
          </Header>
          <TagContainer />
          <Divider />
          <TextAreaContainer />
          <ContentRow alignItems="center" justifyContent="center" padding="20px 0">
            <DIButton
              onClick={() => {
                setModal({ ...modal, visible: false });
              }}
              backgroundColor="#353535"
              borderRadius={51}
              borderColor="#353535"
              style={{
                marginRight: '10px',
              }}
            >
              취소 하기
            </DIButton>
            <DIButton onClick={() => {}} backgroundColor="#AACD06" borderRadius={51}>
              저장 하기
            </DIButton>
          </ContentRow>
        </Container>
      </div>
    </CreateModal>
  );
};

export default TodoModal;

const NotiIcon = styled(NotiIconSVG)`
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  height: 80px;
  outline: none;
  border: none;
  border-bottom: 1px solid #eaeaea;
  font-weight: 500;
  font-size: 28px;
  padding: 0 15px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 28px;
    font-weight: 500;
    color: #dadada;
  }
`;
