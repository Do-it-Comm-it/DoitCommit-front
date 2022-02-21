import Header from '@src/components/Organisms/Board/Header';
import React from 'react';
import styled from 'styled-components';
import CardContainer from './CardContainer';
const Body = () => {
  return (
    <Container>
      <Header />
      <CardContainer />
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
