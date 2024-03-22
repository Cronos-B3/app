import React, { ComponentType } from 'react';
import { StyleSheet, TextProps, TextStyle, Platform } from 'react-native';
import { useTheme } from 'contexts/ThemeContext';
import { RFValue } from 'react-native-responsive-fontsize';
import { LinkProps } from '@expo/html-elements/build/elements/Text.types';

export interface BaseTextProps extends TextProps {
  font?: 'regular' | 'bold';
  noDefaultStyle?: boolean;
}

interface ExtraProps extends BaseTextProps {
  TextComponent: ComponentType<BaseTextProps | LinkProps>;
}

const BaseText = ({
  TextComponent,
  children,
  font = 'regular',
  ellipsizeMode = 'tail',
  adjustsFontSizeToFit = true,
  style,
  noDefaultStyle,
  ...props
}: ExtraProps) => {
  // if (__DEV__) console.log('🐙 - LinkText');

  const { colors } = useTheme();

  if (noDefaultStyle)
    return (
      <TextComponent
        style={[style, font !== 'regular' && { fontFamily: `Heebo_${font}` }]}
        {...props}
      >
        {children}
      </TextComponent>
    );

  const fontSize = (StyleSheet.flatten(style) as TextStyle)?.fontSize || 14;
  const displayFontSize = Platform.OS === 'android' ? fontSize : fontSize * 0.9;

  const lineHeight = (StyleSheet.flatten(style) as TextStyle)?.lineHeight;
  const displayLineHeight =
    lineHeight && Platform.OS === 'android' ? lineHeight * 1.15 : lineHeight;

  return (
    <TextComponent
      style={[
        { color: colors.light },
        style,
        {
          fontFamily: `Heebo_${font}`,
          fontSize: RFValue(displayFontSize),
          lineHeight: displayLineHeight && RFValue(displayLineHeight)
        }
      ]}
      ellipsizeMode={ellipsizeMode}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      {...props}
    >
      {children}
    </TextComponent>
  );
};

export default BaseText;
