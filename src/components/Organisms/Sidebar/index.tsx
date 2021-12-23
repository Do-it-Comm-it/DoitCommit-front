import React, { useState } from 'react';
import styled from 'styled-components';
import SidebarContent from '@src/components/Molecules/Sidebar/SidebarContent';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import SidebarTop from '@src/components/Molecules/Sidebar/SidebarTop';
import SidebarFooter from '@src/components/Molecules/Sidebar/SidebarFooter';

const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // 컴포넌트 바깥 영역 클릭시 닫히게끔
  const clickListener = useCallback(
    (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setOpen(false);
      }
    },
    [setOpen],
  );

  useEffect(() => {
    document.addEventListener('click', clickListener);
    return () => document.removeEventListener('click', clickListener);
  }, [clickListener]);

  const onToggle = () => setOpen((prev) => !prev);
  const onClose = useCallback(() => setOpen(false), []);
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
  flex-direction: column;
  position: relative;
  width: ${({ open }) => (open ? 308 : 83)}px;
  min-width: ${({ open }) => (open ? 308 : 83)}px;
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
