import Body from '@src/components/Organisms/MyPage/Body';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Route } from 'react-router-dom';
const MyPage = () => {
  const theme = useTheme();

  return (
    <Container>
      <Body />
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100%;
`;

export default MyPage;
