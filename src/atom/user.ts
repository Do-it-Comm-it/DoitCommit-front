import { atom } from 'recoil';
import { IUser } from '@src/typings/User';

export const userAtom = atom<IUser | null>({
  key: 'user',
  default: null,
});
