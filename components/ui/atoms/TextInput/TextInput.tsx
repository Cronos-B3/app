import { COLOR_WHITE } from "constants/Colors";
import React, { ForwardRefRenderFunction, forwardRef } from "react";
import { Platform, TextInput as TextInputRN } from "react-native";
import { StyleSheet, TextInputProps, TextStyle } from "react-native";

const TextInput: ForwardRefRenderFunction<TextInputRN, TextInputProps> = (
  {
    style = { flex: 1 },
    placeholderTextColor = `${COLOR_WHITE}60`,
    maxLength = 255,
    ...rest
  },
  ref
) => {
  const fontSize = (StyleSheet.flatten(style) as TextStyle)?.fontSize || 14;

  return (
    <TextInputRN
      {...rest}
      maxLength={maxLength}
      ref={ref}
      style={[s.input, style, { fontSize }]}
      placeholderTextColor={placeholderTextColor}
    />
  );
};

export default forwardRef(TextInput);

const s = StyleSheet.create({
  input: {
    color: COLOR_WHITE,
    ...Platform.select({
      web: { outlineStyle: "none" },
    }),
  },
});
