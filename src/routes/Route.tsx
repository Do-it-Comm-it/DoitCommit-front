import HeaderNavigation from '@src/components/Organisms/HeaderNavigation';
import Modal from '@src/components/Organisms/Modal';
import Sidebar from '@src/components/Organisms/Sidebar';
import React from 'react';
import { Route, RouteProps, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import Footer from '@src/components/Organisms/Footer';
export const CommonComponentWrapper: React.FC = ({ children }) => {
  const location = useLocation();
  return (
    <>
      <Container>
        <Sidebar />
        <Modal />
        <Body>
          <HeaderNavigation />
          <Switch>{children}</Switch>
        </Body>
      </Container>
      {location.pathname !== '/' && <Footer />}
    </>
  );
};

export const PublicRoute: React.FC<RouteProps> = (props) => {
  return <Route {...props}>{props.children}</Route>;
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
