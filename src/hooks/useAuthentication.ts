import { auth } from '@src/service/firebase';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { fetcherWithToken } from '@src/utils/fetcher';
import { userState } from '@src/atom/user';
import { useHistory } from 'react-router';

export const useAuthentication = () => {
  const [user, setUser] = useRecoilState(userState);
  const history = useHistory();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        fetcherWithToken('/api/auth', await firebaseUser.getIdToken())
          .then((res: any) => {
            setUser({
              isEnrolled: res.isEnrolled, // 등록된 유저가 아닐경우 (false) -> 초기정보 입력페이지로 이동 post (/register)
              nickname: res.nickname, // 처음 유저가 들어왔을 땐 서버에서 유저를 발견 못했을 시 null로 응답을 줄 것임.
              todos: res.todos, // 마찬가지로 초기엔 null
              position: res.positions,
              stack: res.stacks,
            });
            if (!user?.isEnrolled) history.push('/register');
          })
          .catch((err) => console.log(err));
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return { user };
};
