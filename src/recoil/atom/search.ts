import { atom } from 'recoil';

export const searchAtom = atom<{
  search: string;
  tag?: number;
  complete: boolean;
}>({
  key: 'atom/search',
  default: {
    search: '',
    complete: false,
  },
});
