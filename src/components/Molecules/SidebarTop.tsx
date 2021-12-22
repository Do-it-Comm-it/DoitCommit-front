import React from 'react';
import styled from 'styled-components';
import ExpandIcon from '@src/assets/menu_extended.svg';
import { useRecoilState } from 'recoil';
import { sidebarAtom } from '@src/recoil/atom/sidebar';
import DIText from '../Atoms/DIText';
const SidebarTop = () => {
  const [open, setOpen] = useRecoilState(sidebarAtom);
  return (
    <SidebarTopWrapper open={open}>
      <IconWrapper open={open}>
        <ExpandIcon onClick={() => setOpen(!open)} />
      </IconWrapper>
      <Container>
        <DIText
          fontColor="#ffffff"
          fontWeight={700}
          fontSize={22}
          style={{ letterSpacing: 0.2, whiteSpace: 'initial', textAlign: 'center' }}
        >
          두잇커밋
        </DIText>
      </Container>
    </SidebarTopWrapper>
  );
};

export const SidebarTopWrapper = styled.div<{ open: boolean }>`
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
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
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default SidebarTop;
