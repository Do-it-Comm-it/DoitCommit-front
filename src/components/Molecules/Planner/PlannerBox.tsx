import React from 'react';
import styled from 'styled-components';

const PlannerBox = () => {
  return <Wrapper></Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  width: 187px;
  height: 161px;
  background: ${({ theme }) => theme.colors.background};
  flex-direction: column;

  box-shadow: 0px 0px 20px rgba(143, 146, 148, 0.1);
  border-radius: 10px;
`;

export default PlannerBox;
