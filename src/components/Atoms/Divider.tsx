import React from 'react';
import styled from 'styled-components';

const Divider = () => {
  return <Container />;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 1px;
  /* box-shadow: ${({ theme }) =>
    `0px 1px 1px ${theme.colors.primary.light500}`}; */
  border-bottom-width: 1px;
  border-bottom-style: solid;
  color: ${({ theme }) => theme.colors.primary.light500};
  border-bottom-color: ${({ theme }) => theme.colors.primary.light500};
`;

export default Divider;
