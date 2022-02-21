import Card from '@src/components/Molecules/Board/Card';
import React from 'react';
import styled from 'styled-components';

const CardContainer = () => {
  return (
    <Container>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </Container>
  );
};

export default CardContainer;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, max-content));
  justify-content: center;
  row-gap: 5ch;
  width: 100%;
  height: 100%;
`;
const Top = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dark.a7};
`;
