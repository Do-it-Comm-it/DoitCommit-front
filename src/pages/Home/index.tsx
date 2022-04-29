import React from 'react';
import styled from 'styled-components';
import HomeTitle from '@src/components/Organisms/Home/HomeTitle';
import HomeTodoList from '@src/components/Organisms/Home/HomeTodoList';
import Planner from '@src/components/Organisms/Home/Planner';
import Community from '@src/components/Organisms/Home/Community';
import AdBanner from '@src/components/Organisms/Home/AdBanner';
import { devices } from '@src/utils/theme';
import LottieLoading from '@src/components/Atoms/LottieLoading';
const Home = () => {
  return (
    <Container>
      <Column>
        <Top>
          <HomeTitle />
          <AdBanner />
        </Top>
        <Bottom>
          <Planner />
          <Community />
        </Bottom>
      </Column>
      <Row>
        <React.Suspense fallback={<LottieLoading />}>
          <HomeTodoList />
        </React.Suspense>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding: 70px;
  padding-left: 153px;
  padding-bottom: 20px;
  justify-content: center;

  @media ${devices.laptop} {
    padding: 8%;
    flex-direction: column;
    align-items: center;
  }
`;

const Column = styled.div`
  width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media ${devices.laptop} {
    max-width: 100%;
  }
`;
const Row = styled.div`
  width: 100%;
  max-width: 800px;
  height: 100%;
  display: flex;
  margin-top: 10px;
  flex-direction: row;
  margin-left: 30px;

  @media ${devices.laptop} {
    margin-top: 30px;
    margin-left: 0px;
  }
`;
const Top = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  @media (max-width: ${1295}px) {
    flex-direction: column;
    align-items: center;
  }

  @media ${devices.laptop} {
    width: 100%;
    flex-direction: row;
  }

  @media ${devices.tablet} {
    flex-direction: column;
  }
`;
export default Home;
