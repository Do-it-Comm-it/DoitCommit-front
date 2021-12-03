import React, { useCallback, useEffect } from 'react';
import { signOut } from '@src/service/firebase';
import { useAuthentication } from '@src/hooks/useAuthentication';
import { useHistory } from 'react-router';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';
import LoginModal from '@src/components/Organisms/LoginModal';
import RegisterModal from '@src/components/Organisms/RegisterModal';
import DIText from '@src/components/Atoms/DIText';
import styled from 'styled-components';

const Home = () => {
  const { user, loading } = useAuthentication();
  const history = useHistory();
  const [modal, setModal] = useRecoilState(modalAtom);

  useEffect(() => {
    // when user joined first.
    if (user && !user.isEnrolled) {
      setModal({ id: 'register', visible: true });
    }
  }, [user, history, setModal]);

  const onClickLogin = useCallback(() => {
    setModal({ id: 'login', visible: true });
  }, [setModal]);

  const onFinish = useCallback(() => {
    setModal({ id: 'register', visible: false });
  }, [setModal]);

  return (
    <Container>
      {loading === true ? (
        <EmptyScreen />
      ) : (
        <Header>
          <DIText>Home</DIText>
          <Wrapper>
            <DIText>안녕하세요 {user?.nickname ?? 'Stranger'}</DIText>
            {user === null && <button onClick={onClickLogin}>Login</button>}
            <button onClick={signOut}>로그아웃</button>
          </Wrapper>
        </Header>
      )}
      {modal.id === 'login' && <LoginModal />}
      {modal.id === 'register' && <RegisterModal onFinish={onFinish} />}
    </Container>
  );
};

const EmptyScreen = styled.div``;
const Container = styled.div``;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Wrapper = styled.div``;
export default Home;
