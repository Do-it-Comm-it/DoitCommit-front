import { getTodo, getTodoData } from '@src/service/api';
import { ITodos } from '@src/typings/Todos';
import { useQuery } from 'react-query';
import { useUser } from './useAuthentication';

const useTodos = () => {
  const { data: user } = useUser();

  const result = useQuery<ITodos[]>(
    'todo',
    () => {
      return getTodo();
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
      return getTodoData(id);
    },
    {
      enabled: user && id !== -1 ? true : false,
    },
  );

  return result;
};

export { useTodos, useTodoItem };
