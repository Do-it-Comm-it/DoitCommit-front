import HeaderNavigation from '@src/components/Organisms/HeaderNavigation';
import Modal from '@src/components/Organisms/Modal';
import Sidebar from '@src/components/Organisms/Sidebar';
import React, { useMemo } from 'react';
import { Routes, Route, RouteProps, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '@src/components/Organisms/Footer';
export const CommonComponentWrapper: React.FC = ({ children }) => {
  const location = useLocation();

  const isIndexPage = useMemo(() => {
    const check = location.pathname !== '/' && location.pathname !== '/mypage';
    return check ? false : true;
  }, [location]);

  return (
    <Container isIndexPage={isIndexPage}>
      <Sidebar />
      <Modal />
      <Body>
        <HeaderNavigation />
        <Routes>{children}</Routes>
      </Body>
      <Footer />
    </Container>
  );
};

const Container = styled.div<{ isIndexPage?: boolean }>`
  width: 100%;
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
  padding-bottom: 200px;
`;
