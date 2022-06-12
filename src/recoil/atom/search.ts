import { atom } from 'recoil';

export const searchAtom = atom<{
  search: string;
  tag: string | null;
}>({
  key: 'atom/search',
  default: {
    search: '',
    tag: null,
  },
});
