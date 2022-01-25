import ContentBox from '@src/components/Molecules/ContentBox';
import AddTodoBox from '@src/components/Molecules/Todo/AddTodoBox';
import TodoBox from '@src/components/Molecules/Todo/TodoBox';
import { userAtom } from '@src/recoil/atom/user';
import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
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
  const todos: TodoType[] = useMemo(() => {
    return [
      {
        id: 1,
        level: 0,
        title: '제이쿼리 입문 강의 듣기',
        date: new Date(),
        body: 'CSS2와 CSS3의 차이점',
        type: 'Study',
        isPinned: true,
      },
      {
        id: 2,
        level: 2,
        title: '제이쿼리 입문 강의 듣기',
        date: new Date(),
        body: null,
        type: 'Study',
        isPinned: true,
      },
      {
        id: 3,
        level: 1,
        title: '제이쿼리 입문 강의 듣기',
        date: new Date(),
        body: null,
        type: 'Study',
        isPinned: false,
      },
    ];
  }, []);

  return (
    <ContentBox title="투데이 투두 리스트" requiredHeader requiredLogin={user ? false : true}>
      <TodoWrapper>
        {todos.map((todo: TodoType) => (
          <TodoBox todo={todo} />
        ))}
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
