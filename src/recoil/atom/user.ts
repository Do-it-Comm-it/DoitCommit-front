import { getUserInfo } from '@src/service/api';
import { IUser } from '@src/typings/User';
import { atom, selector, selectorFamily } from 'recoil';

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

export const userFormState = selectorFamily({
  key: 'formState',
  get:
    (field: string) =>
    ({ get }: any) => {
      if (field === 'interestTechSet') {
        return get(userAtom)[field].map((tech: string) => {
          return {
            value: tech,
            label: tech,
          };
        });
      } else {
        return get(userAtom)[field];
      }
    },
  set:
    (field) =>
    ({ set }, newValue) => {
      set(userAtom, (prevState: any) => ({
        ...prevState,
        [field]: newValue,
      }));
    },
});
