import { useMemo } from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@src/recoil/atom/user';
import { IUser } from '@src/typings/User';

const useAuthentication = () => {
  const setUser = useSetRecoilState(userAtom);
  return useMemo(
    () => ({
      authorize: (user: IUser) => setUser(user),
      logout: () => setUser(null),
    }),
    [setUser],
  );
};

export default useAuthentication;
