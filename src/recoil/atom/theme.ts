import { atom } from 'recoil';

export const themeAtom = atom({
  key: 'theme',
  default: 'light',
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      const storedTheme = localStorage.getItem('theme');
      // 이미 localStorage에 저장된 theme이 있다면 setSelf
      if (storedTheme != null) {
        setSelf(storedTheme);
      }
      // 처리 방식 모르겠음 any로 안하면 type err
      onSet((theme: any) => {
        localStorage.setItem('theme', JSON.stringify(theme));
      });
    },
  ],
});
