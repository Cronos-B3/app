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
    5: 20,
    6: 24,
    round: 999,
  },
  space: { true: 0 },
  zIndex: { true: 0 },
  color: {
    inversedStyle: 'light',
    primary: '#9F62E4',
    secondary: '#6B21C0',
    tertiary: '#D4B9F3',
    overBackground: '#1E1E1E',
    inversed: '#FFFFFF',
    inversed75: 'rgba(255, 255, 255, 0.75)',
    inversed50: 'rgba(255, 255, 255, 0.5)',
    notInversed: '#000000',
    notInversed75: 'rgba(0, 0, 0, 0.75)',
    notInversed50: 'rgba(0, 0, 0, 0.5)',
    notInversedBackground: '#0F0F0F',
    modalBackground: '#18072C',
  },
});

const fontsParams = Platform.select({
  android: {
    size: {
      1: RFValue(12),
      2: RFValue(13),
      3: RFValue(14),
      4: RFValue(15),
      5: RFValue(17),
      6: RFValue(19),
      7: RFValue(21),
      8: RFValue(23),
      9: RFValue(25),
    },
  },
  default: {
    size: {
      1: RFValue(12 * 0.8),
      2: RFValue(13 * 0.8),
      3: RFValue(14 * 0.8),
      4: RFValue(15 * 0.8),
      5: RFValue(17 * 0.8),
      6: RFValue(19 * 0.8),
      7: RFValue(21 * 0.8),
      8: RFValue(23 * 0.8),
      9: RFValue(25 * 0.8),
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
