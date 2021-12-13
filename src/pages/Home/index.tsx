import React, { useCallback, useEffect } from 'react';
import { useAuthentication } from '@src/hooks/useAuthentication';
import { useHistory } from 'react-router';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';
import LoginModal from '@src/components/Organisms/LoginModal';
import RegisterModal from '@src/components/Organisms/RegisterModal';
import styled from 'styled-components';
import HomeTitle from '@src/components/Organisms/Home/HomeTitle';
import HomeTodoList from '@src/components/Organisms/Home/HomeTodoList';
import HomePlanner from '@src/components/Organisms/Home/HomePlanner';
import HomeCommunity from '@src/components/Organisms/Home/HomeCommunity';
import HomeDutorial from '@src/components/Organisms/Home/HomeDutorial';
import HomeBanner from '@src/components/Organisms/Home/HomeBanner';

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
      <HomeTitle />
      <Content>
        <HomeTodoList />
        <Second>
          <Top>
            <HomePlanner />
            <HomeDutorial />
            <HomeCommunity />
          </Top>
          <Bottom>
            <HomeBanner />
          </Bottom>
        </Second>
      </Content>

      {modal.id === 'login' && modal.visible && (
        <LoginModal
          onClose={() => {
            setModal({ id: 'login', visible: false });
          }}
        />
      )}
      {modal.id === 'register' && modal.visible && <RegisterModal onFinish={onFinish} />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.dark.a1};
  padding: 70px;
`;
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const Second = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Top = styled.div`
  width: 100%;
  display: flex;
`;
const Bottom = styled.div`
  width: 100%;
  display: flex;
`;
export default Home;
