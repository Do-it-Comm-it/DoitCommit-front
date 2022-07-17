import Body from '@src/components/Organisms/MyPage/Body';
import { devices } from '@src/utils/theme';
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
  width: 100%;
  height: 100%;
  padding-top: 70px;
  padding-left: 380px;
  padding-right: 380px;
  padding-bottom: 20px;

  @media ${devices.laptopL} {
    padding: 8%;
    padding-left: 12%;
    padding-right: 12%;
  }
`;

export default MyPage;
