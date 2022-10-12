import { atom } from 'recoil';

const bookmarkAtom = atom({
  key: 'atom/bookmark',
  default: false,
});

export default bookmarkAtom;
