import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import NotiIconSVG from '@src/assets/notification.svg';
import { Container, ContentRow, Header } from '@src/components/Atoms/Modal';
import TagContainer from '@src/components/Molecules/TodoModal/TagContainer';
import TextAreaContainer from '@src/components/Molecules/TodoModal/TextAreaContainer';
import Divider from '@src/components/Atoms/Divider';
import DIButton from '@src/components/Atoms/DIButton';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';
import ModalContainer from '@src/components/Molecules/ModalContainer';

import { addTodo, editTodo } from '@src/service/api';
import { ITodos, TodoType } from '@src/typings/Todos';
import { useTodoItem, useTodos } from '@src/hooks/useTodo';

interface Props {
  onClose: () => void;
  stopPropagation: (e: any) => void;
  width?: number;
  height?: number;
  todoId?: number;
}

const TodoModal = ({ onClose, stopPropagation, width, height, todoId = -1 }: Props) => {
  const theme = useTheme();
  const { refetch } = useTodos();
  const [modal, setModal] = useRecoilState(modalAtom);
  const [todo, setTodo] = useState<ITodos>({
    title: '',
    importance: 'LOW',
    content: '',
    type: TodoType.DAILY,
    isFinished: false,
    isFixed: false,
  });
  const { data: todoItem } = useTodoItem(todoId);

  useEffect(() => {
    if (!(todoId === -1) && todoItem) {
      setTodo(todoItem);
    }
  }, [todoId, todoItem]);

  const submitTodo = useCallback(async () => {
    await addTodo(todo);
    setModal({ id: 'todo', visible: false });
    refetch();
  }, [refetch, setModal, todo]);

  const onEdit = useCallback(async () => {
    const result = await editTodo(String(todoId), todo);
    if (result === 1) {
      setModal({ id: 'todo/edit', visible: false });
      refetch();
    }
  }, [refetch, setModal, todo, todoId]);

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
          {todo.isFixed ? (
            <NotiFixedIcon onClick={() => setTodo({ ...todo, isFixed: false })} />
          ) : (
            <NotiIcon onClick={() => setTodo({ ...todo, isFixed: true })} />
          )}
        </Header>
        <TagContainer
          onChangeImportance={(i) => {
            setTodo({ ...todo, importance: i });
          }}
          importance={todo.importance}
          type={todo.type}
          onChangeType={(t) => {
            setTodo({ ...todo, type: t });
          }}
        />
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
  & > path {
    fill: transparent;
  }
`;
const NotiFixedIcon = styled(NotiIconSVG)`
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;

  & > path {
    stroke: ${({ theme }) => theme.colors.main};
    fill: ${({ theme }) => theme.colors.sub3};
  }
`;
const Input = styled.input`
  width: 100%;
  height: 80px;
  outline: none;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.dark.a2};
  font-weight: 500;
  font-size: 28px;
  padding: 0 15px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.dark.a7};
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 28px;
    font-weight: 500;
    color: #dadada;
  }
`;
