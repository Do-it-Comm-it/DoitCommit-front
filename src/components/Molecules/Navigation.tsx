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
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
  height: 52px;
  box-shadow: ${({ position }) =>
    position === 'top' ? `0px 4px 4px rgba(0, 0, 0, 0.08)` : `0px 4px 4px rgba(0, 0, 0, 0.08)`};
`;
