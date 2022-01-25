import React from 'react';
import styled from 'styled-components';
import HomeTitle from '@src/components/Organisms/Home/HomeTitle';
import HomeTodoList from '@src/components/Organisms/Home/HomeTodoList';
import Planner from '@src/components/Organisms/Home/Planner';
import Community from '@src/components/Organisms/Home/Community';
import AdBanner from '@src/components/Organisms/Home/AdBanner';

const Home = () => {
  return (
    <Test>
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
    </Test>
  );
};

const Test = styled.div`
display: flex;
background-color: red;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 70px;
  padding-bottom: 20px;
`;
const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;
const Column = styled.div`
  width: 100%;
  max-width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Row = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin-left: 30px;
`;
const Top = styled.div`
  display: flex;
  margin-bottom: 30px;
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export default Home;
