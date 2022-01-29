import React from 'react';
import styled from 'styled-components';
import HomeTitle from '@src/components/Organisms/Home/HomeTitle';
import HomeTodoList from '@src/components/Organisms/Home/HomeTodoList';
import Planner from '@src/components/Organisms/Home/Planner';
import Community from '@src/components/Organisms/Home/Community';
import AdBanner from '@src/components/Organisms/Home/AdBanner';

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

// const Test = styled.div`
// display: flex;
// background-color: red;
// `;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 70px;
  padding-left: 153px; 
  padding-bottom: 20px;

  @media (max-width:1024px) {  /* cmcm : 지정해주신 변수명으로 사이즈 지정하면 오류가 생깁니다ㅠ */
    padding-left: 70px;
  }

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
