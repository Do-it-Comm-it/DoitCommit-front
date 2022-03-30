import useDarkMode from '@src/hooks/useDarkMode';
import React from 'react';
import styled from 'styled-components';
import LightModeIcon from '@src/assets/lightmode.svg';
import DarkModeIcon from '@src/assets/darkmode.svg';

const SidebarFooter = () => {
  const { theme, toggleTheme } = useDarkMode();

  console.log(theme);
  return (
    <Container>
      {theme === 'light' ? (
        <div onClick={toggleTheme}>
          <DarkModeIcon /> 다크모드로 전환하기
        </div>
      ) : (
        <div onClick={toggleTheme}>
          <LightModeIcon /> 라이트모드로 전환하기
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-top: auto;
  width: 100%;
  padding: 25px 25px 25px 32px;
  background-color: ${({ theme }) => theme.colors.gray.gray900};
  color: #ffffff;
  & > div {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
    line-height: 23px;
    white-space: nowrap;
    & > svg {
      vertical-align: middle;
      margin-right: 30px;
    }
  }
`;
export default SidebarFooter;
