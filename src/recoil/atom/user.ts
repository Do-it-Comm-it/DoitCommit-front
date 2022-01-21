import { getUserInfo } from '@src/service/api';
import { IUser } from '@src/typings/User';
import { atom, selector } from 'recoil';

export const userAtom = atom<IUser | null>({
  key: 'user',
  default: selector({
    key: 'user/Default',
    get: async () => await getUserInfo(),
  }),
});
