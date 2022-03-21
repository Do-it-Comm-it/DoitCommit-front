import TodoBox from '@src/components/Molecules/Todo/TodoBox';
import { todo as todoAPI } from '@src/service/api';
import { ITodos } from '@src/typings/Todos';
import { useQuery } from 'react-query';
import { useUser } from './useAuthentication';

const useTodo = () => {
  const useTodoList = () => {
    const { data: user } = useUser();

    const result = useQuery<ITodos[]>(
      'todo',
      () => {
        return todoAPI.getTodoList();
      },
      {
        enabled: user ? true : false,
      },
    );

    return result;
  };

  const useTodoItem = (id: number) => {
    const { data: user } = useUser();

    const result = useQuery<ITodos>(
      `todo-item-${id}`,
      () => {
        return todoAPI.getTodoById(id);
      },
      {
        enabled: user && id !== -1 ? true : false,
      },
    );

    return result;
  };

  return { useTodoList, useTodoItem };
};

export default useTodo;
