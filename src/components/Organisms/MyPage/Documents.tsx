import React, { useState } from 'react';
import TabButton from '@src/components/Molecules/MyPage/TabButton';
import { useCallback } from 'react';
import styled from 'styled-components';
import Security from '@src/components/Molecules/MyPage/Content/Security';
import LanguageAndLocation from '@src/components/Molecules/MyPage/Content/LanguageAndLocation';
import Account from '@src/components/Molecules/MyPage/Content/Account';
import Notification from '@src/components/Molecules/MyPage/Content/Notification';

const Documents = () => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const handleTab = useCallback((index: number) => {
    setTabIndex(index);
  }, []);

  return (
    <Container>
      <TabContainer>
        <TabButton content="계정" onClick={() => handleTab(1)} selected={tabIndex === 1} fontSize={16} />
        <TabButton content="알림" onClick={() => handleTab(2)} selected={tabIndex === 2} fontSize={16} />
        <TabButton content="언어와지역" onClick={() => handleTab(3)} selected={tabIndex === 3} fontSize={16} />
        <TabButton content="보안" onClick={() => handleTab(4)} selected={tabIndex === 4} fontSize={16} />
      </TabContainer>
      <Content>
        {tabIndex === 1 && <Account />}
        {tabIndex === 2 && <Notification />}
        {tabIndex === 3 && <LanguageAndLocation />}
        {tabIndex === 4 && <Security />}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 80px;
  width: 100%;
  padding: 0 10px;
  border-bottom: 1px solid #eaeaea;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export default Documents;
