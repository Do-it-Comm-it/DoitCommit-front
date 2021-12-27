import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import TabButton from '@src/components/Molecules/MyPage/TabButton';
import PersonalSettings from './PersonalSettings';
import Documents from './Documents';

const ProfileFormArea = () => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const handleTab = useCallback((index: number) => {
    setTabIndex(index);
  }, []);
  return (
    <Container>
      <TabContainer>
        <TabButton content="Personal Settings" onClick={() => handleTab(1)} selected={tabIndex === 1} />
        <TabButton content="Documents" onClick={() => handleTab(2)} selected={tabIndex === 2} />
        <Button>확인</Button>
      </TabContainer>
      <Content>{tabIndex === 1 ? <PersonalSettings /> : <Documents />}</Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 1150px;
  height: 100%;
  min-height: 702px;
  background-color: rgba(255, 255, 255, 1);
  border: solid 1px rgba(234, 234, 234, 1);
  padding: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eaeaea;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 15px;
`;

const Button = styled.button`
  width: 84px;
  height: 38px;
  background-color: #aacd06;
  border-radius: 7px;
  margin-left: auto;
  border: none;
  color: #ffffff;
  font-size: 17px;
  cursor: pointer;
`;
export default ProfileFormArea;
