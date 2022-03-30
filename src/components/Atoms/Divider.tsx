import React from 'react';
import styled from 'styled-components';

const Divider = () => {
  return <Container />;
};

const Container = styled.hr`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  border-width: 1px;
  border-style: solid;
  color: ${({ theme }) => theme.colors.gray.gray300};
  border-color: ${({ theme }) => theme.colors.gray.gray300};
`;

export default Divider;
