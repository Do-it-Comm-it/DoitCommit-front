import React from 'react';
import styled from 'styled-components';
import SidebarContent from '@src/components/Molecules/SidebarContent';
import SidebarTop from '@src/components/Molecules/SidebarTop';
import SidebarFooter from '@src/components/Molecules/SidebarFooter';
import { useRecoilState } from 'recoil';
import { sidebarAtom } from '@src/recoil/atom/sidebar';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

const Sidebar = () => {
  const [open, setOpen] = useRecoilState(sidebarAtom);
  const sidebarRef = useRef(null);

  // 컴포넌트 바깥 영역 클릭시 닫히게끔
  const clickListener = useCallback(
    (e) => {
      if (!(sidebarRef.current! as any).contains(e.target)) {
        setOpen(false);
      }
    },
    [setOpen],
  );

  useEffect(() => {
    document.addEventListener('click', clickListener);
    return () => document.removeEventListener('click', clickListener);
  }, [clickListener]);
  return (
    <SidebarContainer open={open} ref={sidebarRef}>
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
