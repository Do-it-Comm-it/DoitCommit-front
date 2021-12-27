import DIText from '@src/components/Atoms/DIText';
import ContentBox from '@src/components/Molecules/ContentBox';
import { userAtom } from '@src/recoil/atom/user';
import React, { useMemo } from 'react';
import { AiOutlineMinus } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import styled, { useTheme } from 'styled-components';

type TodoType = {
  id: number;
  isDone: boolean;
  value: string;
};

const HomeTodoList = () => {
  const user = useRecoilValue(userAtom);
  const theme = useTheme();
  const todos: TodoType[] = useMemo(() => {
    return [
      {
        id: 1,
        isDone: true,
        value: '두잇커밋 기획하기',
      },
      {
        id: 2,
        isDone: false,
        value: '두잇커밋 스타일가이드 만들기',
      },
      {
        id: 3,
        isDone: true,
        value: '두잇커밋 회의 일정 잡기',
      },
      {
        id: 4,
        isDone: false,
        value: '1차 시안 작업하기',
      },
      {
        id: 5,
        isDone: true,
        value: '회사 프로젝트 정리하기',
      },
    ];
  }, []);

  return (
    <ContentBox title="투두 리스트" minHeight={790} requiredHeader requiredLogin={user ? false : true}>
      <TodoBox>
        <TodoTitle fontSize={16} fontFamily={theme.font.NotoSansKRRegular} style={{ paddingBottom: 20 }}>
          투데이 투두
        </TodoTitle>
        <TodoList>
          {todos.map((todo: TodoType) => (
            <Todo key={todo.id}>
              <Check isDone={todo.isDone}>
                {todo.isDone ? (
                  <BsCheck size={12} color={theme.colors.background} />
                ) : (
                  <AiOutlineMinus color={theme.colors.background} size={12} />
                )}
              </Check>
              {todo.value}
            </Todo>
          ))}
        </TodoList>
      </TodoBox>
    </ContentBox>
  );
};

const TodoTitle = styled(DIText)``;
const TodoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  box-sizing: border-box;
`;
const TodoList = styled.div`
  display: flex;
  flex-direction: column;
`;
const Todo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 5px;
`;
const Check = styled.div<{ isDone: boolean }>`
  display: flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background-color: ${({ theme, isDone }) => (isDone ? theme.colors.main : theme.colors.dark.a2)};
  margin-right: 10px;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
export default HomeTodoList;
