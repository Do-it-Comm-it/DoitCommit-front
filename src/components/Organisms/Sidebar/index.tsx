import React from 'react';
import styled from 'styled-components';
import SidebarContent from '@src/components/Molecules/SidebarContent';
import SidebarTop, { SidebarTopWrapper } from '@src/components/Molecules/SidebarTop';
import SidebarFooter from '@src/components/Molecules/SidebarFooter';
const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarTop />
      <SidebarContent />
      <SidebarFooter />
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  position: fixed;
  width: 83px;
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
  &:hover {
    width: 308px;
    ${SidebarTopWrapper} {
      & > svg {
        position: absolute;
        right: 0;
        margin-right: 30px;
      }

      & > div {
        margin-top: 28px;
      }
    }
  }
`;

export default Sidebar;
