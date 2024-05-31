// Custom config for theme https://tamagui.dev/docs/core/configuration

import { createFont, createTamagui, createTokens } from 'tamagui';

const tokens = createTokens({
  size: {
    // TODO: Change these values to match your design system.
    0: 0,
    true: 0,
    1: 4,
    2: 8,
    3: 16,
    4: 32,
    5: 64,
  },
  space: {
    // TODO: Change these values to match your design system.
    0: 0,
    true: 0,
    1: 4,
    2: 8,
    3: 16,
    4: 32,
    5: 64,
  },
  zIndex: {
    0: 0,
  },
  color: {
    primary: '#9F62E4',
    secondary: '#6B21C0',
    tertiary: '#D4B9F3',
    inversed: '#FFFFFF',
    not_inversed: '#000000',
  },
  radius: {
    0: 0,
    true: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    round: 999,
  },
});

const fontsParams = {
  size: {
    xxs: 8,
    xs: 10,
    s: 12,
    m: 14,
    l: 16,
    xl: 18,
  },
};

const defaultFont = createFont({
  family: 'Heebo',
  ...fontsParams,
});

const boldFont = createFont({
  family: 'HeeboBold',
  ...fontsParams,
});

export const config = createTamagui({
  tokens,
  themes: {
    // light: {}, // TODO: Add a light theme.
    dark: tokens.color,
  },
  fonts: {
    // Required keys for tamagui.
    heading: boldFont,
    body: defaultFont,
    // Custom keys.
    bold: boldFont,
  },
});

export type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
