import ContentBox from '@src/components/Molecules/ContentBox';
import AddTodoBox from '@src/components/Molecules/Todo/AddTodoBox';
import TodoBox from '@src/components/Molecules/Todo/TodoBox';
import { todoAtom, userAtom } from '@src/recoil/atom/user';
import { ITodos } from '@src/typings/Todos';
import React, { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

export type TodoType = {
  id: number;
  level: number;
  title: string;
  date: Date;
  body: string | null;
  type: string;
  isPinned: boolean;
};

const HomeTodoList = () => {
  const user = useRecoilValue(userAtom);
  const [todos, setTodos] = useRecoilState(todoAtom);

  return (
    <ContentBox title="투데이 투두 리스트" requiredHeader requiredLogin={user ? false : true}>
      <TodoWrapper>
        {todos && todos.map((todo: ITodos, idx: number) => <TodoBox todo={todo} key={idx} />)}
        <AddTodoBox />
      </TodoWrapper>
    </ContentBox>
  );
};

const TodoWrapper = styled.div`
  display: grid;
  width: 100%;
  margin-top: 20px;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  height: 100%;
`;
export default HomeTodoList;
