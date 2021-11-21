import React, { useEffect } from 'react';
import { signOut } from '@src/service/firebase';
import { useAuthentication } from '@src/hooks/useAuthentication';
import { useHistory } from 'react-router';
const Home = () => {
  const { user } = useAuthentication();
  const history = useHistory();
  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
    console.log(user);
  }, [user]);
  return (
    <div>
      <h2>Home</h2>
      <h2>안녕하세요 {user?.displayName}님</h2>
      {user && <button onClick={signOut}>로그아웃</button>}
    </div>
  );
};

export default Home;
