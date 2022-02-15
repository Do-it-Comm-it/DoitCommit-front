import React from 'react';
import styled from 'styled-components';

type NavigationProps = {
  children: React.ReactElement | React.ReactElement[];
  position?: 'top' | 'right';
};

const Navigation = ({ children, position = 'top' }: NavigationProps) => {
  return <Container position={position}>{children}</Container>;
};

export default Navigation;

const Container = styled.nav<{ position: string }>`
  padding: 15px 20px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.header};
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  box-shadow: ${({ position }) =>
    position === 'top' ? `0px 4px 4px rgba(0, 0, 0, 0.08)` : `0px 4px 4px rgba(0, 0, 0, 0.08)`};
`;
