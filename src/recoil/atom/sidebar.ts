import { atom } from 'recoil';

export const sidebarAtom = atom<boolean>({
  key: 'sidebar',
  default: false,
});
