import { getTodo } from '@src/service/api';
import { ITodos } from '@src/typings/Todos';
import { atom, atomFamily, selector, selectorFamily } from 'recoil';

export const todoAtom = atom({
  key: 'atom/todo',
  default: selector({
    key: 'selector/todo',
    get: () => getTodo().catch((err) => Promise.reject(err)),
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
      (id) =>
      ({ get }) => {
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
      },
  }),
});
