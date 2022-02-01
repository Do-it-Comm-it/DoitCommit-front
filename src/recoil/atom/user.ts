import { getUserInfo } from '@src/service/api';
import { Tech } from '@src/typings/Tech';
import { IUser } from '@src/typings/User';
import { atom, selector } from 'recoil';

export const userAtom = atom<IUser | null>({
  key: 'user',
  default: selector({
    key: 'user/Default',
    get: () =>
      getUserInfo().catch((err) => {
        Promise.reject(err);
      }),
  }),
});

export const techState = selector({
  key: 'selector/tech',
  get: ({ get }) => {
    return get(userAtom)?.interestTechSet?.map((tech) => {
      return {
        value: tech,
        label: tech,
      };
    });
  },
  set: ({ set }, newValue) => {
    set(userAtom, (prevState: any) => ({
      ...prevState,
      interestTechSet: newValue,
    }));
  },
});
