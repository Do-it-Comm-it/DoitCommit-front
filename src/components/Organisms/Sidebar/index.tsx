import React, { useState } from 'react';
import styled from 'styled-components';
import SidebarContent from '@src/components/Molecules/SidebarContent';
import SidebarTop from '@src/components/Molecules/SidebarTop';
import { useAuthentication } from '@src/hooks/useAuthentication';
import { useCallback } from 'react';
const Sidebar = () => {
  const { user } = useAuthentication();
  const [open, setOpen] = useState(false);

  const onMouseOver = useCallback(() => {
    setOpen(true);
  }, []);
  const onMouseOut = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <SidebarOutbox open={open} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      <SidebarContainer open={open}>
        <SidebarTop open={open} user={user} />
        <SidebarContent />
      </SidebarContainer>
    </SidebarOutbox>
  );
};

const SidebarOutbox = styled.div<{ open: boolean }>`
  width: ${(props) => (props.open ? '308px' : '83px')};
  height: 100vh;
  background-color: aqua;
  overflow: hidden;
  transition: 0.5s;
`;
const SidebarContainer = styled.div<{ open: boolean }>`
  width: 100%;
  height: 100vh;
  background-color: #353535;
  margin-right: ${(props) => (props.open ? null : '20px')};

  &::after {
    display: block;
    content: '';
    clear: both;
  }
`;

export default Sidebar;
