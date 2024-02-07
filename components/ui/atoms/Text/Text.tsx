import React from 'react';
import {
  Text as TextRN,
  TextProps as TextPropsRN,
  StyleSheet,
  TextStyle,
  Platform
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface TextProps extends TextPropsRN {
  font?: 'regular' | 'bold';
}

const Text = ({
  children,
  font = 'regular',
  ellipsizeMode = 'tail',
  style,
  ...rest
}: TextProps) => {
  // if (__DEV__) console.log('🐙 - Text');

  const fontSize = (StyleSheet.flatten(style) as TextStyle)?.fontSize || 14;
  const displayFontSize = Platform.OS === 'android' ? fontSize : fontSize * 0.9;

  return (
    <TextRN
      style={[{ color: "white" }, style, { fontFamily: `Heebo_${font}`, fontSize: RFValue(displayFontSize) }]}
      ellipsizeMode={ellipsizeMode}
      {...rest}
    >
      {children}
    </TextRN>
  );
};

export default Text;
