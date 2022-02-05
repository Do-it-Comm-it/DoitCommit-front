import { userAtom } from '@src/recoil/atom/user';
import { getTodo, getTodoData } from '@src/service/api';
import { ITodos } from '@src/typings/Todos';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

const useTodos = () => {
  const user = useRecoilValue(userAtom);

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
  const user = useRecoilValue(userAtom);

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
