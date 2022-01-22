import React from 'react';
import styled from 'styled-components';
import SidebarContent from '@src/components/Molecules/Sidebar/SidebarContent';
import { useRef } from 'react';
import { useCallback } from 'react';
import SidebarTop from '@src/components/Molecules/Sidebar/SidebarTop';
import SidebarFooter from '@src/components/Molecules/Sidebar/SidebarFooter';
import { devices } from '@src/utils/theme';
import { useRecoilState } from 'recoil';
import { sidebarAtom } from '@src/recoil/atom/sidebar';
import useOutsideClick from '@src/hooks/useOutsideClick';

const Sidebar = () => {
  const [open, setOpen] = useRecoilState(sidebarAtom);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const onToggle = () => setOpen((prev) => !prev);
  const onClose = useCallback(() => setOpen(false), [setOpen]);
  useOutsideClick(sidebarRef, () => setOpen(false));
  return (
    <SidebarContainer open={open} ref={sidebarRef}>
      <SidebarTop open={open} onToggle={onToggle} />
      <SidebarContent onClose={onClose} />
      <SidebarFooter />
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div<{ open: boolean }>`
  display: flex;
  @media ${devices.laptop} {
    display: ${({ open }) => (open ? 'flex' : 'none')};
  }
  width: ${({ open }) => (open ? 308 : 83)}px;
  min-width: ${({ open }) => (open ? 308 : 83)}px;
  flex-direction: column;
  position: relative;

  left: 0;
  top: 0;
  min-height: 100vh;
  z-index: 1;
  transition: 0.5s;
  overflow-x: hidden;
  background-color: #353535;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Sidebar;
