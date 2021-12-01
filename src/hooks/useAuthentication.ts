import { auth } from '@src/service/firebase';
import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userAtom } from '@src/recoil/atom/user';

export const useAuthentication = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [loading, setLoading] = useState<boolean>(true);
  const reset = useResetRecoilState(userAtom);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        //TODO: connection with backend side.
        //now, it saves user without backend(temporary method)
        setUser({
          isEnrolled: false,
          position: [],
          stacks: [],
          todos: [],
          nickname: firebaseUser.displayName,
          email: firebaseUser.email,
          image: firebaseUser.photoURL,
          token: firebaseUser.refreshToken,
        });
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

// fetcherWithToken('/api/auth', await firebaseUser.getIdToken())
//   .then((user: any) => {
//     const { isEnrolled, nickname, todos, position, stacks } = user;
//     setUser({
//       isEnrolled, // 등록된 유저가 아닐경우 (false) -> 초기정보 입력페이지로 이동 post (/register)
//       nickname, // 처음 유저가 들어왔을 땐 서버에서 유저를 발견 못했을 시 null로 응답을 줄 것임.
//       todos, // 마찬가지로 초기엔 null
//       position,
//       stacks,
//     });
//   })
//   .catch((err) => console.log(err));
