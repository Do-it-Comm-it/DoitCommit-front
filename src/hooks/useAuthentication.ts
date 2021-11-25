import { auth } from '@src/service/firebase';
import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { fetcherWithToken } from '@src/utils/fetcher';
import { userAtom } from '@src/atom/user';

export const useAuthentication = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const reset = useResetRecoilState(userAtom);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        fetcherWithToken('/api/auth', await firebaseUser.getIdToken())
          .then((user: any) => {
            setUser({
              isEnrolled: user.isEnrolled, // 등록된 유저가 아닐경우 (false) -> 초기정보 입력페이지로 이동 post (/register)
              nickname: user.nickname, // 처음 유저가 들어왔을 땐 서버에서 유저를 발견 못했을 시 null로 응답을 줄 것임.
              todos: user.todos, // 마찬가지로 초기엔 null
              position: user.positions,
              stacks: user.stacks,
            });
          })
          .catch((err) => console.log(err));
      } else {
        reset();
      }
    });
    return () => unsubscribe();
  }, [setUser, reset]);

  return user;
};
