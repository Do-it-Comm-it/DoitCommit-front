import Header from '@src/components/Organisms/Board/Header';
import React from 'react';
import { Route } from 'react-router';
import styled from 'styled-components';
import Notice from './Notice';
import CardContainer from './CardContainer';
import FloatingButton from './FloatingButton';
import BoardEditor from './BoardEditor';
const Body = () => {
  return (
    <Container>
      <Route exact path="/community">
        <Header />
        <CardContainer />
      </Route>
      <Route exact path="/community/notice">
        <Header />
        <Notice />
      </Route>
      <Route exact path="/community/edit">
        <BoardEditor />
      </Route>
      <FloatingButton />
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
