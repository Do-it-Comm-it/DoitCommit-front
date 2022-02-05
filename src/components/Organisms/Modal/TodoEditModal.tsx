import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import NotiIconSVG from '@src/assets/notification.svg';
import NotiIconFixedSVG from '@src/assets/notification-fixed.svg';
import { Container, ContentRow, Header } from '@src/components/Atoms/Modal';
import TagContainer from '@src/components/Molecules/TodoModal/TagContainer';
import TextAreaContainer from '@src/components/Molecules/TodoModal/TextAreaContainer';
import Divider from '@src/components/Atoms/Divider';
import DIButton from '@src/components/Atoms/DIButton';
import { useRecoilCallback, useRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';
import ModalContainer from '@src/components/Molecules/ModalContainer';
import useInput from '@src/hooks/useInput';
import { TodoType } from '@src/typings/Todos';
import { todoItemState } from '@src/recoil/atom/todo';
import { editTodo } from '@src/service/api';

interface Props {
  onClose: () => void;
  stopPropagation: (e: any) => void;
  width?: number;
  height?: number;
}

const TodoEditModal = ({ onClose, stopPropagation, width, height }: Props) => {
  const [modal, setModal] = useRecoilState(modalAtom);
  const todoId = modal.todoId;
  const [todo, setTodo] = useRecoilState(todoItemState(todoId!));
  const [title, onChangeTitle] = useInput(todo.title);
  const [content, onChangeContent] = useInput(todo.content);
  const [type, setType] = useState<TodoType>(todo.type);
  const [importance, setImportance] = useState(todo.importance);
  const [isFixed, setIsFixed] = useState(todo.isFixed);

  const theme = useTheme();

  const onEdit = useRecoilCallback(({ set, snapshot }) => async () => {
    const prev = snapshot.getLoadable(todoItemState(todoId!)).getValue();
    const updated = {
      ...prev,
      title,
      content,
      type,
      importance,
      isFixed,
    };
    const result = await editTodo(String(todoId), updated);
    if (result === 1) {
      set(todoItemState(todoId!), { ...updated });
      setModal({ id: 'todo/edit', visible: false });
    }
  });
  return (
    <ModalContainer width={width} height={height} onClose={onClose} stopPropagation={stopPropagation}>
      <Container>
        <Header>
          <Input defaultValue={title} onChange={onChangeTitle} placeholder="제목 없음" />
          {isFixed ? (
            <NotiFixedIcon onClick={() => setIsFixed(!isFixed)} />
          ) : (
            <NotiIcon onClick={() => setIsFixed(!isFixed)} />
          )}
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
          <DIButton onClick={onEdit} backgroundColor={theme.colors.main} borderRadius={51}>
            저장 하기
          </DIButton>
        </ContentRow>
      </Container>
    </ModalContainer>
  );
};

export default TodoEditModal;

const NotiIcon = styled(NotiIconSVG)`
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
`;
const NotiFixedIcon = styled(NotiIconFixedSVG)`
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
