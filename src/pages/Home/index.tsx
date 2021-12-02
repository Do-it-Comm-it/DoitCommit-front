import React, { useCallback, useEffect } from 'react';
import { useAuthentication } from '@src/hooks/useAuthentication';
import { useHistory } from 'react-router';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';
import LoginModal from '@src/components/Organisms/LoginModal';
import RegisterModal from '@src/components/Organisms/RegisterModal';
import styled from 'styled-components';
import HeaderNavigation from '@src/components/Organisms/HeaderNavigation';

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

  const onFinish = useCallback(() => {
    setModal({ id: 'register', visible: false });
  }, [setModal]);

  return (
    <Container>
      {loading === true ? <EmptyScreen /> : <HeaderNavigation />}
      {modal.id === 'login' && <LoginModal />}
      {modal.id === 'register' && <RegisterModal onFinish={onFinish} />}
    </Container>
  );
};

const EmptyScreen = styled.div``;
const Container = styled.div``;
export default Home;
