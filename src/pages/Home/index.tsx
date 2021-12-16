import React from 'react';
import styled from 'styled-components';
import HomeTitle from '@src/components/Organisms/Home/HomeTitle';
import HomeTodoList from '@src/components/Organisms/Home/HomeTodoList';
import HomePlanner from '@src/components/Organisms/Home/HomePlanner';
import HomeCommunity from '@src/components/Organisms/Home/HomeCommunity';
import HomeDutorial from '@src/components/Organisms/Home/HomeDutorial';
import HomeBanner from '@src/components/Organisms/Home/HomeBanner';

const Home = () => {
  return (
    <Container>
      <HomeTitle />
      <Content>
        <HomeTodoList />
        <Second>
          <Top>
            <HomePlanner />
            <HomeDutorial />
            <HomeCommunity />
          </Top>
          <Bottom>
            <HomeBanner />
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
`;
const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const Second = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Top = styled.div`
  width: 100%;
  display: flex;
`;
const Bottom = styled.div`
  width: 100%;
  display: flex;
`;
export default Home;
