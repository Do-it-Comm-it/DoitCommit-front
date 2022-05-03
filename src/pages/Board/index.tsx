import Body from '@src/components/Organisms/Board/Body';
import { devices } from '@src/utils/theme';
import React from 'react';
import styled from 'styled-components';
import Skeleton from '@src/components/Molecules/LoadingSkeleton';
const Board = () => {
  return (
    <Container>
      <Skeleton.Suspense>
        <Body />
      </Skeleton.Suspense>
    </Container>
  );
};

export default Board;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 70px;
  padding-left: 153px;
  padding-bottom: 20px;
  @media ${devices.laptop} {
    padding: 3%;
  }
  align-items: center;
`;
