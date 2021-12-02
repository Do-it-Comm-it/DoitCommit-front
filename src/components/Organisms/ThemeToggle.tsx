import useDarkMode from '@src/hooks/useDarkMode';
import React from 'react';
import styled from 'styled-components';
import Toggle from '../Molecules/Toggle';
import { MdModeNight } from 'react-icons/md';
import { BsSunFill } from 'react-icons/bs';
const ThemeToggle = () => {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <Container>
      <Toggle value={theme === 'light' ? false : true} onChange={toggleTheme} />
      {theme === 'light' ? <BsSunFill size={20} /> : <MdModeNight size={20} />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ThemeToggle;
