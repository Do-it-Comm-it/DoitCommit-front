import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import NotiIconSVG from '@src/assets/notification.svg';
import { Container, ContentRow, Header } from '@src/components/Atoms/Modal';
import TagContainer from '@src/components/Molecules/TodoModal/TagContainer';
import TextAreaContainer from '@src/components/Molecules/TodoModal/TextAreaContainer';
import Divider from '@src/components/Atoms/Divider';
import DIButton from '@src/components/Atoms/DIButton';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';
import ModalContainer from '@src/components/Molecules/ModalContainer';
import useInput from '@src/hooks/useInput';
import { addTodo } from '@src/service/api';

interface Props {
  onClose: () => void;
  stopPropagation: (e: any) => void;
  width?: number;
  height?: number;
}
const TodoModal = ({ onClose, stopPropagation, width, height }: Props) => {
  const [modal, setModal] = useRecoilState(modalAtom);
  const [title, onChangeTitle] = useInput('');
  const [content, onChangeContent] = useInput('');
  const [type, setType] = useState('스터디');
  const [importance, setImportance] = useState('low');
  const [isFixed, setIsFixed] = useState(false);

  const submitTodo = useCallback(async () => {
    await addTodo({
      title,
      importance,
      type,
      content,
      isFixed,
    });
  }, [title, importance, type, content, isFixed]);

  return (
    <ModalContainer width={width} height={height} onClose={onClose} stopPropagation={stopPropagation}>
      <Container>
        <Header>
          <Input value={title} onChange={onChangeTitle} placeholder="제목 없음" />
          <NotiIcon isFixed={isFixed} onClick={() => setIsFixed(!isFixed)} />
        </Header>
        <TagContainer onChangeImportance={setImportance} importance={importance} type={type} onChangeType={setType} />
        <Divider />
        <TextAreaContainer content={content} onChangeContent={onChangeContent} />
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
          <DIButton onClick={submitTodo} backgroundColor="#020202" borderRadius={51}>
            저장 하기
          </DIButton>
        </ContentRow>
      </Container>
    </ModalContainer>
  );
};

export default TodoModal;

const NotiIcon = styled(NotiIconSVG)<{ isFixed: boolean }>`
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;

  background-color: ${({ isFixed }) => (isFixed ? 'red' : 'none')};
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
