import { useTheme } from 'contexts/ThemeContext';
import React, { ForwardRefRenderFunction, forwardRef } from 'react';
import { Platform, TextInput as TextInputRN } from 'react-native';
import { StyleSheet, TextInputProps, TextStyle } from 'react-native';

const TextInput: ForwardRefRenderFunction<TextInputRN, TextInputProps> = (
  { style = { flex: 1 }, placeholderTextColor, maxLength = 255, ...rest },
  ref
) => {
  const { colors } = useTheme();

  const fontSize = (StyleSheet.flatten(style) as TextStyle)?.fontSize || 14;

  return (
    <TextInputRN
      {...rest}
      maxLength={maxLength}
      ref={ref}
      style={[s.input, { color: colors.text }, style, { fontSize }]}
      placeholderTextColor={placeholderTextColor || `${colors.text}60`}
    />
  );
};

export default forwardRef(TextInput);

const s = StyleSheet.create({
  input: {
    color: 'black',
    ...Platform.select({
      web: { outlineStyle: "none" },
      }),
  },
});
