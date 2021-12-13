import DIText from '@src/components/Atoms/DIText';
import React from 'react';
import styled, { useTheme } from 'styled-components';

const HomePlanner = () => {
  const theme = useTheme();

  return (
    <Container>
      <Title fontSize={17} fontFamily={theme.font.NotoSansKRRegular}>
        두잇 플래너
      </Title>
      <PlannerBox></PlannerBox>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin-left: 10px;
`;
const Title = styled(DIText)``;
const PlannerBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  height: 285px;
  border: 1px solid #eaeaea;
  background-color: ${({ theme }) => theme.colors.background};
  box-sizing: border-box;
`;
export default HomePlanner;
