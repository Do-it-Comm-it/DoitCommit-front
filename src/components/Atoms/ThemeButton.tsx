import React from 'react';
import { useTheme } from 'styled-components';
import DIButton from '@src/components/Atoms/DIButton';
import useDarkMode from '@src/hooks/useDarkMode';
import LightModeIcon from '@src/assets/lightmode.svg';
import DarkModeIcon from '@src/assets/darkmode.svg';
const ThemeButton = () => {
  const themeColor = useTheme();
  const { theme, toggleTheme } = useDarkMode();
  const style: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  return (
    <DIButton
      borderRadius={51}
      backgroundColor={themeColor.colors.gray.gray600}
      borderColor={themeColor.colors.gray.gray600}
      onClick={toggleTheme}
      style={style}
    >
      {theme === 'light' ? (
        <>
          다크모드 <DarkModeIcon />
        </>
      ) : (
        <>
          라이트모드 <LightModeIcon />
        </>
      )}
    </DIButton>
  );
};

export default ThemeButton;
