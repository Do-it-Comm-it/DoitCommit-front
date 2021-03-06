import React from 'react';
import styled from 'styled-components';
import ExpandIcon from '@src/assets/menu_extended.svg';
import LogoSvg from '@src/assets/logo.svg';

type Props = {
  open: boolean;
  onToggle: () => void;
};

const SidebarTop = ({ open, onToggle }: Props) => {
  return (
    <SidebarTopWrapper open={open}>
      <IconWrapper open={open} onClick={onToggle}>
        <ExpandIcon />
      </IconWrapper>
      <Container>
        <Logo />
      </Container>
    </SidebarTopWrapper>
  );
};

export const SidebarTopWrapper = styled.div<{ open: boolean }>`
  position: relative;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 21px 15px;
  margin-bottom: 15px;

  &::after {
    content: '';
    position: absolute;
    width: 80%;
    height: 1px;
    background-color: #66727a;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;
const IconWrapper = styled.div<{ open: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  & > svg {
    margin-left: ${({ open }) => open && 'auto'};
  }

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled(LogoSvg)``;

export default SidebarTop;
