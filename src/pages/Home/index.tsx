import React from 'react';
import styled from 'styled-components';
import HomeTitle from '@src/components/Organisms/Home/HomeTitle';
import HomeTodoList from '@src/components/Organisms/Home/HomeTodoList';
import Planner from '@src/components/Organisms/Home/Planner';
import Community from '@src/components/Organisms/Home/Community';
import AdBanner from '@src/components/Organisms/Home/AdBanner';
import { devices } from '@src/utils/theme';
const Home = () => {
  return (
    <Container>
      <HomeTitle />
      <ContentWrapper>
        <Column>
          <Top>
            <AdBanner />
          </Top>
          <Bottom>
            <Planner />
            <Community />
          </Bottom>
        </Column>
        <Row>
          <HomeTodoList />
        </Row>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 70px;
  padding-left: 153px;
  padding-bottom: 20px;

  @media ${devices.laptop} {
    padding: 8%;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

  @media ${devices.laptop} {
    flex-direction: column;
    align-items: center;
  }
`;
const Column = styled.div`
  width: 100%;
  max-width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media ${devices.laptop} {
    max-width: 100%;
  }
`;
const Row = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin-left: 30px;

  @media ${devices.laptop} {
    margin-top: 30px;
    margin-left: 0px;
  }
`;
const Top = styled.div`
  display: flex;
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
