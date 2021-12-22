import React from 'react';
import styled from 'styled-components';
import SidebarContent from '@src/components/Molecules/SidebarContent';
import SidebarTop from '@src/components/Molecules/SidebarTop';
import SidebarFooter from '@src/components/Molecules/SidebarFooter';
import { useRecoilValue } from 'recoil';
import { sidebarAtom } from '@src/recoil/atom/sidebar';

const Sidebar = () => {
  const open = useRecoilValue(sidebarAtom);

  return (
    <SidebarContainer open={open}>
      <SidebarTop />
      <SidebarContent />
      <SidebarFooter />
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: ${({ open }) => (open ? 308 : 83)}px;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 1;
  transition: 0.5s;
  overflow-x: hidden;
  background-color: #353535;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Sidebar;
