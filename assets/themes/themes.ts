import dark from './dark.json';

export type ThemeObject = {
  primary: string;
  secondary: string;
  tertiary: string;
  background: string;
  modalBackground: string;
  text: string;
  light: string;
  dark: string;
};

export type Theme = 'dark';

type Themes = {
  dark: ThemeObject;
};

const themes: Themes = { dark };

export default themes;
