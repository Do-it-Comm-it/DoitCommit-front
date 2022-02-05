import React, { ChangeEvent, useCallback, useState } from 'react';
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
import { addTodo, editTodo } from '@src/service/api';
import { TodoType } from '@src/typings/Todos';
import { todoAtom, todoItemState } from '@src/recoil/atom/todo';

interface Props {
  onClose: () => void;
  stopPropagation: (e: any) => void;
  width?: number;
  height?: number;
  todoId?: number;
}

const TodoModal = ({ onClose, stopPropagation, width, height, todoId = -1 }: Props) => {
  const [modal, setModal] = useRecoilState(modalAtom);
  const [todo, setTodo] = useRecoilState(todoItemState(todoId));

  const [type, setType] = useState<TodoType>(todo.type);
  const [importance, setImportance] = useState(todo.importance);
  const [isFixed, setIsFixed] = useState(todo.isFixed);
  const theme = useTheme();
  console.log(todoId);

  const submitTodo = useRecoilCallback(({ set, snapshot }) => async () => {
    const { data } = await addTodo({
      title: todo.title,
      importance,
      type,
      content: todo.content,
      isFixed,
    });
    set(todoAtom, (prevState: any) => [...prevState, data]);
    setModal({ id: 'todo', visible: false });
  });
  const onEdit = useRecoilCallback(({ set, snapshot }) => async () => {
    const prev = snapshot.getLoadable(todoItemState(todoId!)).getValue();
    const updated = {
      ...prev,
      title: todo.title,
      content: todo.content,
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
  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTodo({
        ...todo,
        [e.target.name]: e.target.value,
      });
    },
    [setTodo, todo],
  );
  return (
    <ModalContainer width={width} height={height} onClose={onClose} stopPropagation={stopPropagation}>
      <Container>
        <Header>
          <Input defaultValue={todo.title} onChange={onChangeInput} placeholder="제목 없음" name="title" />
          {isFixed ? (
            <NotiFixedIcon onClick={() => setIsFixed(!isFixed)} />
          ) : (
            <NotiIcon onClick={() => setIsFixed(!isFixed)} />
          )}
        </Header>
        <TagContainer onChangeImportance={setImportance} importance={importance} type={type} onChangeType={setType} />
        <Divider />
        <TextAreaContainer content={todo.content} onChangeContent={onChangeInput} />
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
          <DIButton
            onClick={() => {
              todoId === -1 ? submitTodo() : onEdit();
            }}
            backgroundColor={theme.colors.main}
            borderRadius={51}
          >
            저장 하기
          </DIButton>
        </ContentRow>
      </Container>
    </ModalContainer>
  );
};

export default TodoModal;

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
