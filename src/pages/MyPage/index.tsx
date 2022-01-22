import Body from '@src/components/Organisms/MyPage/Body';
import React from 'react';
import styled from 'styled-components';
const MyPage = () => {
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
