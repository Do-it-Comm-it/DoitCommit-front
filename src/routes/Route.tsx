import HeaderNavigation from '@src/components/Organisms/HeaderNavigation';
import Modal from '@src/components/Organisms/Modal';
import React, { useMemo } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '@src/components/Organisms/Footer';
import Skeleton from '@src/components/Molecules/LoadingSkeleton';

export const CommonComponentWrapper: React.FC = ({ children }) => {
  const location = useLocation();
  const isIndexPage = useMemo(() => {
    const check = location.pathname !== '/' && location.pathname !== '/mypage';
    return check ? false : true;
  }, [location]);

  return (
    <>
      <Container isIndexPage={isIndexPage}>
        <Skeleton.Suspense>
          <Modal />
        </Skeleton.Suspense>
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
