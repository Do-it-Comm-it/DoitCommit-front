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
      warning: string;
      success: string;
      white: string;
      black: string;
      primary: {
        dark400: string;
        dark300: string;
        dark200: string;
        dark100: string;
        default: string;
        light100: string;
        light200: string;
        light300: string;
        light400: string;
        light500: string;
      };
      gray: {
        gray100: string;
        gray150: string;
        gray155: string;
        gray200: string;
        gray300: string;
        gray400: string;
        gray500: string;
        gray600: string;
        gray700: string;
        gray800: string;
        gray850: string;
        gray900: string;
        gray950: string;
        gray955: string;
      };
      sub: {
        blue100: string;
        blue200: string;
        green100: string;
        green200: string;
        pink100: string;
        pink200: string;
        gary100: string;
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
    warning: '#FF4B4B',
    success: '#00C73C',
    white: '#FFFFFF',
    black: '#000000',
    primary: {
      dark400: '#000414',
      dark300: '#001361',
      dark200: '#0028C7',
      dark100: '#1443FF',
      default: '#476CFF',
      light100: '#708DFF',
      light200: '#99ADFF',
      light300: '#C1CEFF',
      light400: '#E1E7FF',
      light500: '#F2F3F9',
    },
    gray: {
      gray100: '#FEFEFE',
      gray150: '#FBFBFB',
      gray155: '#F9F9F9',
      gray200: '#F5F5F5',
      gray300: '#CECECE',
      gray400: '#818181',
      gray500: '#5B5B5B',
      gray600: '#353535',
      gray700: '#282828',
      gray800: '#1B1B1B',
      gray850: '#131313',
      gray900: '#111111',
      gray950: '#0F0F0F',
      gray955: '#0C0C0C',
    },
    sub: {
      blue100: '#E6F3F3',
      blue200: '#5872CF',
      green100: '#E3F4E4',
      green200: '#4F8234',
      pink100: '#FDECF2',
      pink200: '#E24781',
      gary100: '#E0E1E4',
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
    background: '#FEFEFE',
    warning: '#FF4B4B',
    success: '#00C73C',
    white: '#000000',
    black: '#FFFFFF',
    primary: {
      dark400: '#000414',
      dark300: '#708DFF',
      dark200: '#0028C7',
      dark100: '#1443FF',
      default: '#476CFF',
      light100: '#708DFF',
      light200: '#99ADFF',
      light300: '#C1CEFF',
      light400: '#99ADFF',
      light500: '#111111',
    },
    gray: {
      gray100: '#282828',
      gray150: '#0C0C0C',
      gray155: '#131313',
      gray200: '#282828',
      gray300: '#818181',
      gray400: '#CECECE',
      gray500: '#818181',
      gray600: '#1B1B1B',
      gray700: '#282828',
      gray800: '#1B1B1B',
      gray850: '#131313',
      gray900: '#0C0C0C',
      gray950: '#F5F5F5',
      gray955: '#0C0C0C',
    },
    sub: {
      blue100: '#E6F3F3',
      blue200: '#5872CF',
      green100: '#E3F4E4',
      green200: '#4F8234',
      pink100: '#FDECF2',
      pink200: '#E24781',
      gary100: '#E0E1E4',
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
