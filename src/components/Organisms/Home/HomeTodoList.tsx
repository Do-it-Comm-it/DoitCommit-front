import ContentBox from '@src/components/Molecules/ContentBox';
import AddTodoBox from '@src/components/Molecules/Todo/AddTodoBox';
import TodoBox from '@src/components/Molecules/Todo/TodoBox';
import { userAtom } from '@src/recoil/atom/user';
import React from 'react';
import { todoIdState } from '@src/recoil/atom/todo';
import { devices } from '@src/utils/theme';
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
  const todoIds = useRecoilValue(todoIdState);

  return (
    <ContentBox title="투데이 투두 리스트" requiredHeader requiredLogin={user ? false : true}>
      <TodoWrapper>
        {todoIds && todoIds.slice(0, 4)?.map((todoId) => <TodoBox key={todoId} id={todoId} />)}
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

  @media (max-width: ${1580}px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media ${devices.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${devices.tablet} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export default HomeTodoList;
