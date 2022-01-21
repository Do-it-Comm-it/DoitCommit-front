import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    font: {
      EliceDigitalBaeumBold: string;
      EliceDigitalBaeumRegular: string;
      NotoSansKRBold: string;
      NotoSansKRRegular: string;
      NotoSansKRLight: string;
    };
    colors: {
      background: string;
      main: string;
      sub: string;
      sub2: string;
      sub3: string;
      warning: string;
      dark: {
        a1: string;
        a2: string;
        a3: string;
        a4: string;
        a5: string;
        a6: string;
        a7: string;
      };
    };
  }
}

export const light: DefaultTheme = {
  font: {
    EliceDigitalBaeumBold: 'EliceDigitalBaeum Bold',
    EliceDigitalBaeumRegular: 'EliceDigitalBaeum Regular',
    NotoSansKRBold: 'NotoSansKR Bold',
    NotoSansKRRegular: 'NotoSansKR Regular',
    NotoSansKRLight: 'NotoSansKR Light',
  },
  colors: {
    background: '#FFFFFF',
    main: '#AACD06',
    sub: '#D8F0C5',
    sub2: '#A2D79F',
    sub3: '#9ED2BA',
    warning: '#FF4B4B',
    dark: {
      a1: '#ECECEC',
      a2: '#DADADA',
      a3: '#8F9294',
      a4: '#616161',
      a5: '#353535',
      a6: '#2D2D2D',
      a7: '18171C',
    },
  },
};

export const dark: DefaultTheme = {
  font: {
    EliceDigitalBaeumBold: 'EliceDigitalBaeum Bold',
    EliceDigitalBaeumRegular: 'EliceDigitalBaeum Regular',
    NotoSansKRBold: 'NotoSansKR Bold',
    NotoSansKRRegular: 'NotoSansKR Regular',
    NotoSansKRLight: 'NotoSansKR Light',
  },
  colors: {
    background: '#293144',
    main: '#AACD06',
    sub: '#D8F0C5',
    sub2: '#A2D79F',
    sub3: '#9ED2BA',
    warning: '#FF4B4B',
    dark: {
      a1: '#ECECEC',
      a2: '#DADADA',
      a3: '#8F9294',
      a4: '#616161',
      a5: '#353535',
      a6: '#2D2D2D',
      a7: '#18171C',
    },
  },
};

export const sizes = {
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const devices = {
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
  laptopL: `(min-width: ${sizes.laptopL})`,
  desktop: `(min-width: ${sizes.desktop})`,
};
