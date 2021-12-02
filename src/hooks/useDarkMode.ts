import { themeAtom } from '@src/recoil/atom/theme';
import { useRecoilState } from 'recoil';
import { useCallback, useEffect } from 'react';
const useDarkMode = () => {
  const [theme, setTheme] = useRecoilState(themeAtom);
  const toggleTheme = useCallback(() => {
    // atom effect로 set이 실행되면 localStorage 갱신
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }, [setTheme, theme]);

  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      // default 로 설정된 atom value 사용 (light)
      setTheme(theme);
    }
  }, [setTheme, theme]);
  return { theme, toggleTheme };
};
export default useDarkMode;
