import React, { useEffect } from 'react';
import { signOut } from '@src/service/firebase';
import { useAuthentication } from '@src/hooks/useAuthentication';
import { useHistory } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';
import LoginModal from '@src/components/Organisms/LoginModal';
import RegisterModal from '@src/components/Organisms/RegisterModal';
import DIText from '@src/components/Atoms/DIText';
import styled from 'styled-components';
const Home = () => {
  const user = useAuthentication();
  const history = useHistory();
  const setVisible = useSetRecoilState(modalAtom);
  const [modal, setModal] = useRecoilState(modalAtom);

  useEffect(() => {
    // 유저는 있지만 닉네임은 없을 때
    if (user && !user.isEnrolled) {
      // history.push('/register'); // 초기 등록 페이지로.
      setModal({ id: 'register', visible: true });
    }
  }, [user, history, setModal]);

  return (
    <Container>
      <Header>
        <DIText>Home</DIText>
        <Wrapper>
          <DIText>안녕하세요 {user?.nickname ? user?.nickname : 'Stranger'}</DIText>
          <button onClick={() => setVisible({ id: 'login', visible: true })}>Login</button>
          <button onClick={signOut}>로그아웃</button>
        </Wrapper>
      </Header>
      {modal.id === 'login' && <LoginModal />}
      {modal.id === 'register' && <RegisterModal />}
    </Container>
  );
};

const Container = styled.div``;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Wrapper = styled.div``;
export default Home;
