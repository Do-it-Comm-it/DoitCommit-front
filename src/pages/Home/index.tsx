import React from 'react';
import styled from 'styled-components';
import HomeTitle from '@src/components/Organisms/Home/HomeTitle';
import HomeTodoList from '@src/components/Organisms/Home/HomeTodoList';
import Planner from '@src/components/Organisms/Home/Planner';
import Tutorial from '@src/components/Organisms/Home/Tutorial';
import Community from '@src/components/Organisms/Home/Community';
import Banner from '@src/components/Organisms/Home/Banner';

const Home = () => {
  return (
    <Container>
      <HomeTitle />
      <Content>
        <HomeTodoList />
        <Second>
          <Top>
            <Planner />
            <Tutorial />
            <Community />
          </Top>
          <Bottom>
            <Banner />
          </Bottom>
        </Second>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.dark.a1};
  padding: 70px;
  padding-bottom: 20px;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;
const Second = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Top = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
const Bottom = styled.div`
  width: 100%;
  display: flex;
`;
export default Home;
