import { atom } from 'recoil';
type Modal = {
  id: 'register' | 'login' | 'todo' | 'todo/edit' | 'none';
  visible: boolean;
  todoId?: number;
};
export const modalAtom = atom<Modal>({
  key: 'modal',
  default: {
    id: 'none',
    visible: false,
  },
});
