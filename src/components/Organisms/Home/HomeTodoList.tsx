import ContentBox from '@src/components/Molecules/ContentBox';
import AddTodoBox from '@src/components/Molecules/Todo/AddTodoBox';
import TodoBox from '@src/components/Molecules/Todo/TodoBox';
import React from 'react';
import { devices } from '@src/utils/theme';
import styled from 'styled-components';
import useTodo from '@src/hooks/useTodo';
import { useUser } from '@src/hooks/useAuthentication';

const HomeTodoList = () => {
  const { data: user } = useUser();
  const { useTodoList } = useTodo();
  const { data: todos, refetch: onRefetch } = useTodoList();

  return (
    <ContentBox
      title={'📘 최신 아티클'}
      requiredHeader
      requiredLogin={user ? false : true}
      to={'/community'}
    >
      <TodoWrapper>
        {todos &&
          todos
            .slice(0, 4)
            .map((todo) => (
              <TodoBox key={todo.todoId} todo={todo} onRefetch={onRefetch} />
            ))}
        <AddTodoBox requiredLogin={user ? false : true} />
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
