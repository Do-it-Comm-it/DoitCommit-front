import DIText from '@src/components/Atoms/DIText';
import React from 'react';
import styled from 'styled-components';

const HomeBanner = () => {
  return (
    <Container>
      <PlannerBox></PlannerBox>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 10px;
`;
const PlannerBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  height: 190px;
  border: 1px solid #eaeaea;
  background-color: ${({ theme }) => theme.colors.background};
  box-sizing: border-box;
`;
export default HomeBanner;
