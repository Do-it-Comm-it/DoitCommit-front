import React from 'react';
import styled from 'styled-components';
import HomeTitle from '@src/components/Organisms/Home/HomeTitle';
import HomeTodoList from '@src/components/Organisms/Home/HomeTodoList';
import Planner from '@src/components/Organisms/Home/Planner';
import Community from '@src/components/Organisms/Home/Community';
import AdBanner from '@src/components/Organisms/Home/AdBanner';
import { devices } from '@src/utils/theme';
import Skeleton from '@src/components/Molecules/LoadingSkeleton';
import ThemeButton from '@src/components/Atoms/ThemeButton';

const Home = () => {
  return (
    <>
      <Container>
        <Column>
          <Top>
            <Skeleton.Suspense>
              <HomeTitle />
            </Skeleton.Suspense>
            <AdBanner />
          </Top>
          <Bottom>
            <Skeleton.Suspense>
              <Planner />
            </Skeleton.Suspense>
            <Skeleton.Suspense>
              <Community />
            </Skeleton.Suspense>
          </Bottom>
        </Column>
        <Row>
          <Skeleton.Suspense>
            <HomeTodoList />
          </Skeleton.Suspense>
        </Row>
      </Container>
      <BtnWrap>
        <ModeBtn>
          <ThemeButton />
        </ModeBtn>
      </BtnWrap>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding: 70px 70px 0 70px;
  /* padding-left: 153px; */
  /* padding-bottom: 20px; */
  justify-content: center;
  @media ${devices.laptop} {
    padding: 8%;
    flex-direction: column;
    align-items: center;
  }
`;

const BtnWrap = styled.div`
  width: 100%;
`;

const ModeBtn = styled.div`
  padding: 0 140px 30px 140px;
  float: right;
  /* 데스크탑 아래크기는 고려하지않았음.*/
`;

const Column = styled.div`
  width: 800px;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media ${devices.laptop} {
    width: 100%;
  }
  @media ${devices.tablet} {
    width: 100%;
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

  @media (max-width: ${1580}px) {
    max-width: 400px;
  }

  @media ${devices.laptop} {
    max-width: 100%;
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

  @media (max-width: ${1870}px) {
    flex-direction: column;
  }

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
