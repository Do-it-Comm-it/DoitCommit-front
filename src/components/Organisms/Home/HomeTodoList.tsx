import ContentBox from '@src/components/Molecules/ContentBox';
import AddTodoBox from '@src/components/Molecules/Todo/AddTodoBox';
import TodoBox from '@src/components/Molecules/Todo/TodoBox';
import React from 'react';
import { devices } from '@src/utils/theme';
import styled from 'styled-components';
import useTodo from '@src/hooks/useTodo';
import { useUser } from '@src/hooks/useAuthentication';
import { Importance, ITodos, TodoType } from '@src/typings/Todos';

const emptyTodo: Array<ITodos> = [
  {
    type: TodoType.PRIVATE,
    content: '새로운 목표를 달성 할 수 있어요.',
    importance: Importance.LOW,
    isFixed: false,
    title: '투두 리스트를 \n 쉽게 관리해 보세요.',
  },
  {
    type: TodoType.PRIVATE,
    content: '함께 공부할 팀원들을 모집 할 수 있어요',
    importance: Importance.LOW,
    isFixed: false,
    title: '두잇 그룹으로 \n 함께 스터디 해 보세요.',
  },
  {
    type: TodoType.PRIVATE,
    content: '더 많은 정보를 공유 해 주세요.',
    importance: Importance.LOW,
    isFixed: false,
    title: '좋은 정보를 \n 우리 함께 나눠요.',
  },
];

const HomeTodoList = () => {
  const { data: user } = useUser();
  const { useTodoList } = useTodo();
  const { data: todos, refetch: onRefetch } = useTodoList();
  // 최신 아최신 아티클 - 6시간마다 주기적으로 바뀌는 api 이후 수정
  return (
    <ContentBox
      title={
        // user
        //   ? `🔥 목표 달성이 얼마 남지 않았어요!`
        //   : `📘 로그인 후 이용 가능합니다.`
        '📘 최신 아티클'
      }
      requiredHeader
      requiredLogin={user ? false : true}
      to={'/community'}
    >
      <TodoWrapper>
        {
          // todos &&
          //   todos
          //     .slice(0, 4)
          //     .map((todo) => (
          //       <TodoBox key={todo.todoId} todo={todo} onRefetch={onRefetch} />
          //     ))
          emptyTodo.map((todo, index) => (
            <TodoBox key={index} todo={todo} onRefetch={onRefetch} isEmpty />
          ))
        }
        {/* <RouterLinkBox to={'/community'}></RouterLinkBox> */}
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
