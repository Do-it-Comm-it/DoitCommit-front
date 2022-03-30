import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return <Container></Container>;
};

export default Footer;

const Container = styled.div`
  clear: both;
  position: relative;
  width: 100%;
  height: 260px;
  background-color: ${({ theme }) => theme.colors.gray.gray900};
`;
