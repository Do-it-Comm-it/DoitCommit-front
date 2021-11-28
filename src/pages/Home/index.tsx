import React, { useEffect } from 'react';
import { signOut } from '@src/service/firebase';
import { useAuthentication } from '@src/hooks/useAuthentication';
import { useHistory } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';
const Home = () => {
  const user = useAuthentication();
  const history = useHistory();
  const setShow = useSetRecoilState(modalAtom);
  useEffect(() => {
    // 유저는 있지만 닉네임은 없을 때
    if (user && !user.isEnrolled) {
      history.push('/register'); // 초기 등록 페이지로.
    }
  }, [user]);
  return (
    <div>
      <h2>Home</h2>
      <h2>안녕하세요 {user?.nickname ? user?.nickname : 'Stranger'}</h2>
      <button onClick={() => setShow(true)}>Login</button>
      <button onClick={signOut}>로그아웃</button>
    </div>
  );
};

export default Home;
