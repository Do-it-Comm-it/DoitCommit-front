import { selector } from 'recoil';
import keywordAtom from '../atom/keyword';

const keywordState = selector({
  key: 'selector/keyword',
  get: ({ get }) => {
    const keyword = get(keywordAtom);
    return keyword.split(' ');
  },
});

export default keywordState;
