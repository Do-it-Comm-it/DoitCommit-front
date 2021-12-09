import useDarkMode from '@src/hooks/useDarkMode';
import React from 'react';
import styled from 'styled-components';
import LightModeIcon from '@src/assets/라이트모드.svg';
import DarkModeIcon from '@src/assets/다크모드.svg';

const SidebarFooter = () => {
  const { theme, toggleTheme } = useDarkMode();
  return (
    <Container>
      {theme === 'light' ? (
        <div>
          <DarkModeIcon onClick={toggleTheme} /> 다크모드로 전환하기
        </div>
      ) : (
        <div>
          <LightModeIcon onClick={toggleTheme} /> 라이트모드로 전환하기
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 25px 25px 25px 32px;
  background-color: #18171c;
  color: #ffffff;
  margin-top: 300px;
  & > div {
    line-height: 23px;
    white-space: nowrap;
    & > svg {
      vertical-align: middle;
      margin-right: 30px;
    }
  }
`;
export default SidebarFooter;
