import dark from './dark.json';

export type ThemeObject = {
  primary: string;
  secondary: string;
  tertiary: string;
  background: string;
  modal_background: string;
  text: string;
  light: string;
  dark: string;
  error: string;
  status_bar: string;
};

export type Theme = 'dark';

export const DEFAULT_THEME: Theme = 'dark';

type Themes = {
  dark: ThemeObject;
};

const themes: Themes = { dark };

export default themes;
