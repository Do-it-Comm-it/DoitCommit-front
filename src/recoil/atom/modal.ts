import { atom } from 'recoil';
export const modalAtom = atom({
  key: 'modal',
  default: {
    id: 'none',
    visible: false,
  },
});
