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
    boxShadow: string;
    colors: {
      background: string;
      body: string;
      main: string;
      sub: string;
      sub2: string;
      sub3: string;
      warning: string;
      header: string;
      sidebar: string;
      searchBar: string;
      dark: {
        a1: string;
        a2: string;
        a3: string;
        a4: string;
        a5: string;
        a6: string;
        a7: string;
        a8: string;
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
  boxShadow: '0px 0px 20px rgba(143, 146, 148, 0.3);',
  colors: {
    background: '#FEFEFE',
    body: '#F2F3F9',
    main: '#476CFF',
    sub: '#001361',
    sub2: '#F5F5F5',
    sub3: '#E1E7FF',
    warning: '#FF4B4B',
    header: '#FFFFFF',
    sidebar: '#353535',
    searchBar: '#FFFFFF',
    dark: {
      a1: '#ECECEC',
      a2: '#DADADA',
      a3: '#818181',
      a4: '#616161',
      a5: '#353535',
      a6: '#282828',
      a7: '#0F0F0F',
      a8: '#FFFFFF',
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
  boxShadow: 'none',
  colors: {
    background: '#282828',
    body: '#131313',
    main: '#476CFF',
    sub: '#708DFF',
    sub2: '#0F0F0F',
    sub3: '#E1E7FF',
    warning: '#FF4B4B',
    header: '#000000',
    sidebar: '#1B1B1B',
    searchBar: '#131313',
    dark: {
      a1: '#ECECEC',
      a2: '#DADADA',
      a3: '#CECECE',
      a4: '#616161',
      a5: '#1B1B1B',
      a6: '#FEFEFE',
      a7: '#F5F5F5',
      a8: '#000000',
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
  tablet: `(max-width: ${sizes.tablet})`,
  laptop: `(max-width: ${sizes.laptop})`,
  laptopL: `(max-width: ${sizes.laptopL})`,
  desktop: `(max-width: ${sizes.desktop})`,
};
