import { useTheme } from 'contexts/ThemeContext';
import React, { ForwardRefRenderFunction, forwardRef } from 'react';
import { Platform, TextInput as TextInputRN } from 'react-native';
import { StyleSheet, TextInputProps as TextInputPropsRN, TextStyle } from 'react-native';

export interface TextInputProps extends TextInputPropsRN {
  editableOpacity?: number;
}

const TextInput: ForwardRefRenderFunction<TextInputRN, TextInputProps> = (
  { style = s.flex, placeholderTextColor, maxLength = 255, ...rest },
  ref
) => {
  const { colors } = useTheme();

  const fontSize = (StyleSheet.flatten(style) as TextStyle)?.fontSize || 14;

  return (
    <TextInputRN
      {...rest}
      maxLength={maxLength}
      ref={ref}
      style={[s.input, { color: colors.light }, style, { fontSize }]}
      placeholderTextColor={placeholderTextColor || `${colors.light}80`}
    />
  );
};

export default forwardRef(TextInput);

const s = StyleSheet.create({
  flex: { flex: 1 },
  input: {
    color: 'black',
    ...Platform.select({
      web: { outlineStyle: 'none' }
    })
  }
});
