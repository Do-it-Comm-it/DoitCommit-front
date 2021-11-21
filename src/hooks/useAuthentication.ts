import firebase from 'firebase/compat/app';
import { auth } from '@src/service/firebase';
import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { User } from '@src/typings/User';

const userState = atom<User | null>({
  key: 'user',
  default: null,
});
export const useAuthentication = () => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser?.uid,
          displayName: firebaseUser?.displayName!,
          idToken: await firebaseUser?.getIdToken(),
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return { user };
};
