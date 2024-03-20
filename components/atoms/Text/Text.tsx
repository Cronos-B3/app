import React from 'react';
import {
  StyleSheet,
  Text as TextRN,
  TextProps as TextPropsRN,
  TextStyle,
  Platform
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export interface TextProps extends TextPropsRN {
  font?: 'regular' | 'bold';
  noDefaultStyle?: boolean;
}

const Text = ({
  children,
  font = 'regular',
  ellipsizeMode = 'tail',
  adjustsFontSizeToFit = true,
  style,
  noDefaultStyle,
  ...rest
}: TextProps) => {
  // if (__DEV__) console.log('🐙 - Text');

  if (noDefaultStyle)
    return (
      <TextRN style={[style, font !== 'regular' && { fontFamily: `Heebo_${font}` }]} {...rest}>
        {children}
      </TextRN>
    );

  const fontSize = (StyleSheet.flatten(style) as TextStyle)?.fontSize || 14;
  const displayFontSize = Platform.OS === 'android' ? fontSize : fontSize * 0.9;

  const lineHeight = (StyleSheet.flatten(style) as TextStyle)?.lineHeight;
  const displayLineHeight =
    lineHeight && Platform.OS === 'android' ? lineHeight * 1.15 : lineHeight;

  return (
    <TextRN
      style={[
        { color: 'white' },
        style,
        {
          fontFamily: `Heebo_${font}`,
          fontSize: RFValue(displayFontSize),
          lineHeight: displayLineHeight && RFValue(displayLineHeight)
        }
      ]}
      ellipsizeMode={ellipsizeMode}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      {...rest}
    >
      {children}
    </TextRN>
  );
};

export default Text;
