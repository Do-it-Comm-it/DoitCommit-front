import { auth } from '@src/service/firebase';
import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userAtom } from '@src/recoil/atom/user';
import { IUser } from '@src/typings/User';
import { getAuthUser } from '@src/service/api';

export const useAuthentication = () => {
  const [user, setUser] = useRecoilState<IUser | null>(userAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const reset = useResetRecoilState(userAtom);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        let techList = null;
        const token = await firebaseUser.getIdToken();
        const { user } = await getAuthUser(token);

        if (user.tech) {
          techList = user.tech.split(',');
        }
        setUser({ ...user, tech: techList });
        setLoading(false);
      } else {
        reset();
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [setUser, reset]);

  return { user, loading };
};
