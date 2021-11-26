import { IUser } from '@src/typings/User';
import { atom } from 'recoil';

export const userAtom = atom<IUser | null>({
  key: 'user',
  default: null,
});
