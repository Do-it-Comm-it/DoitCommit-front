import BoardContent from '@src/components/Molecules/Board/BoardContent';
import Thumbnail from '@src/components/Atoms/Board/Thumbnail';
import React from 'react';
import styled from 'styled-components';

const Card = () => {
  return (
    <Container>
      <Thumbnail />
      <BoardContent />
    </Container>
  );
};

export default Card;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 386px;
  height: 451px;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 10px;
`;
