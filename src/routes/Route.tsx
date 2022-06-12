import HeaderNavigation from '@src/components/Organisms/HeaderNavigation';
import Modal from '@src/components/Organisms/Modal';
import Sidebar from '@src/components/Organisms/Sidebar';
import React, { useMemo } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '@src/components/Organisms/Footer';
import Skeleton from '@src/components/Molecules/LoadingSkeleton';
import { modalAtom } from '@src/recoil/atom/modal';
import { useRecoilValue } from 'recoil';
import { searchAtom } from '@src/recoil/atom/search';
import SearchBox from '@src/components/Molecules/SearchBox';

export const CommonComponentWrapper: React.FC = ({ children }) => {
  const location = useLocation();
  const search = useRecoilValue(searchAtom);
  const modal = useRecoilValue(modalAtom);
  const isIndexPage = useMemo(() => {
    const check = location.pathname !== '/' && location.pathname !== '/mypage';
    return check ? false : true;
  }, [location]);

  return (
    <>
      <Container isIndexPage={isIndexPage}>
        <Sidebar />
        {modal.visible && <Modal />}
        <Body>
          <Skeleton.Suspense>
            <HeaderNavigation />
          </Skeleton.Suspense>
          <Routes>{children}</Routes>
        </Body>
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div<{ isIndexPage?: boolean }>`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
