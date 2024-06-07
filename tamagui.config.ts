// Custom config for theme https://tamagui.dev/docs/core/configuration

import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { createFont, createTamagui, createTokens } from 'tamagui';

const tokens = createTokens({
  size: {
    true: 0,
    0: 0,
    1: 7,
    2: 14,
    3: 21,
    4: 28,
    5: 35,
    6: 42,
    7: 49,
    8: 56,
    9: 63,
  },
  radius: {
    0: 0,
    true: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    round: 999,
  },
  space: { true: 0 },
  zIndex: { true: 0 },
  color: {
    inversed_style: 'light',
    primary: '#9F62E4',
    secondary: '#6B21C0',
    tertiary: '#D4B9F3',
    inversed: '#FFFFFF',
    inversed75: 'rgba(255, 255, 255, 0.75)',
    inversed50: 'rgba(255, 255, 255, 0.5)',
    not_inversed: '#000000',
    not_inversed_background: '#0F0F0F',
  },
});

const fontsParams = Platform.select({
  android: {
    size: {
      1: RFValue(13),
      // Used font size
      2: RFValue(13),
      3: RFValue(14),
      4: RFValue(15),
      // Useless, but required for tamagui
      5: RFValue(16),
      6: RFValue(16),
      7: RFValue(16),
      8: RFValue(16),
      9: RFValue(16),
    },
  },
  default: {
    size: {
      1: RFValue(10),
      // Used font size
      2: RFValue(10),
      3: RFValue(11),
      4: RFValue(12),
      // Useless, but required for tamagui
      5: RFValue(12),
      6: RFValue(12),
      7: RFValue(12),
      8: RFValue(12),
      9: RFValue(12),
    },
  },
});

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
  defaultFont: 'body',
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
