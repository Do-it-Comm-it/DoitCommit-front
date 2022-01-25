import { atom } from 'recoil';
type Modal = {
  id: 'register' | 'login' | 'todo' | 'none';
  visible: boolean;
};
export const modalAtom = atom<Modal>({
  key: 'modal',
  default: {
    id: 'none',
    visible: false,
  },
});
