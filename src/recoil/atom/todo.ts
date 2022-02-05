import { getTodo } from '@src/service/api';
import { ITodos, TodoType } from '@src/typings/Todos';
import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { userAtom } from './user';

export const todoAtom = atom({
  key: 'atom/todo',
  default: selector({
    key: 'selector/todo',
    get: ({ get }) => {
      const user = get(userAtom);
      if (!user) {
        return [];
      } else {
        return getTodo().catch((err) => Promise.reject(err));
      }
    },
  }),
});

export const todoIdState = atom<number[]>({
  key: 'atom/todoIdState',
  default: selector({
    key: 'todoIdState/Default',
    get: ({ get }) => get(todoAtom).map((v: ITodos) => v.todoId),
  }),
});

export const todoItemState = atomFamily<ITodos, number>({
  key: 'todoItem',
  default: selectorFamily({
    key: 'todoItem/Default',
    get:
      (id: number) =>
      ({ get }) => {
        console.log('selectorId', id);
        if (id === -1)
          return {
            title: '',
            importance: 'LOW',
            content: '',
            type: TodoType.DAILY,
            isFinished: false,
            isFixed: false,
          };
        else {
          const data = get(todoAtom);
          const target = data.find((v: ITodos) => v.todoId === id);
          return {
            todoId: target.todoId,
            type: target.type,
            title: target.title,
            content: target.content,
            importance: target.importance,
            todoDateTime: target.todoDateTime,
            isFixed: target.isFixed,
            isFinished: target.isFinished,
          };
        }
      },
  }),
});
