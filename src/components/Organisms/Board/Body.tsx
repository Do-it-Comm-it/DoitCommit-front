import Header from '@src/components/Organisms/Board/Header';
import React from 'react';
import { Route } from 'react-router';
import styled from 'styled-components';
import Announcement from './Announcement';
import CardContainer from './CardContainer';
const Body = () => {
  return (
    <Container>
      <Header />
      <Route exact path="/community">
        <CardContainer />
      </Route>
      <Route exact path="/community/announcement">
        <Announcement />
      </Route>
    </Container>
  );
};

export default Body;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
