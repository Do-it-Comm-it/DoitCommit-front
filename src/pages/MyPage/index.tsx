import React from 'react';
import styled from 'styled-components';
const MyPage = () => {
  return (
    <Container>
      <Content>
        <h3>나의 두잇 프로필</h3>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  max-width: 1920px;
  width: 100%;
  min-width: 1400px;
`;
const Content = styled.div`
  background-color: #ffffff;
  padding: 40px;
  width: 90%;
  margin: 0 auto;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);

  & > h3 {
    font-size: 30px;
  }
`;
export default MyPage;
