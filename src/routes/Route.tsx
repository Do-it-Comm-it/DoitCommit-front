import HeaderNavigation from '@src/components/Organisms/HeaderNavigation';
import Modal from '@src/components/Organisms/Modal';
import Sidebar from '@src/components/Organisms/Sidebar';
import React, { useMemo } from 'react';
import { Route, RouteProps, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import Footer from '@src/components/Organisms/Footer';
export const CommonComponentWrapper: React.FC = ({ children }) => {
  const location = useLocation();

  const isIndexPage = useMemo(() => {
    return location.pathname !== '/' ? false : true;
  }, [location]);

  return (
    <Container isIndexPage={isIndexPage}>
      <Sidebar />
      <Modal />
      <Body>
        <HeaderNavigation />
        <Switch>{children}</Switch>
      </Body>
      <Footer />
    </Container>
  );
};

export const PublicRoute: React.FC<RouteProps> = (props) => {
  return <Route {...props}>{props.children}</Route>;
};

const Container = styled.div<{ isIndexPage?: boolean }>`
  width: 100%;
  height: ${({ isIndexPage }) => (isIndexPage ? `100%` : `100vh`)};
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
