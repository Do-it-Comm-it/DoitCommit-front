import { atom, selector } from 'recoil';
import { userAtom } from './user';

export const techAtom = atom({
  key: 'atom/tech',
  default: selector({
    key: 'tech/Default',
    get: ({ get }) => {
      const techList = get(userAtom)?.interestTechSet;
      return techList?.map((tech) => {
        return {
          value: tech,
          label: tech,
        };
      });
    },
  }),
});
