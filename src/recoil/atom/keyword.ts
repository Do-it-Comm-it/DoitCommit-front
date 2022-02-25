import { atom } from 'recoil';

const keywordAtom = atom({
  key: 'atom/keyword',
  default: '',
});

export default keywordAtom;
