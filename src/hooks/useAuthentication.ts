import { useMemo } from 'react';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@src/recoil/atom/user';
import { IUser } from '@src/typings/User';

const useAuthentication = () => {
  const setUser = useSetRecoilState(userAtom);
  return useMemo(
    () => ({
      authorize: () =>
        getUserInfo()
          .then((user) => {
            return Promise.resolve(() => setUser(user));
          })
          .catch((_error) => {
            return Promise.reject(() => setUser(null));
          }),
      logout: () => setUser(null),
    }),
    [setUser],
  );
};

export default useAuthentication;
