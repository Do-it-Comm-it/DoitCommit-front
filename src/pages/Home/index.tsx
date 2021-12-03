import React, { useCallback, useEffect } from 'react';
import { useAuthentication } from '@src/hooks/useAuthentication';
import { useHistory } from 'react-router';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';
import LoginModal from '@src/components/Organisms/LoginModal';
import RegisterModal from '@src/components/Organisms/RegisterModal';
import styled from 'styled-components';

const Home = () => {
  const { user } = useAuthentication();
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
      {modal.id === 'login' && modal.visible && <LoginModal />}
      {modal.id === 'register' && modal.visible && <RegisterModal onFinish={onFinish} />}
    </Container>
  );
};

const Container = styled.div``;
export default Home;
