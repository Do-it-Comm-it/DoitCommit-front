import { atom } from 'recoil';

export const fileAtom = atom<any>({
  key: 'atom/file',
  default: {
    image: '',
    previewUrl: '',
  },
});
