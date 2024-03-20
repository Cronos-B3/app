import React, { ForwardRefRenderFunction, forwardRef } from 'react';
import {
  StyleSheet,
  Pressable as PressableRN,
  PressableProps as PressablePropsRN,
  ViewStyle,
  View
} from 'react-native';

type CustomProps = {
  pressedOpacity?: number;
};

export type PressableProps = CustomProps & PressablePropsRN;

const Pressable: ForwardRefRenderFunction<View, PressableProps> = (
  { children, style, disabled, pressedOpacity = 0.6, ...rest },
  ref
) => {
  // if (__DEV__) console.log('🐙 - Pressable');

  const flattenStyle = StyleSheet.flatten(style) as ViewStyle;

  const styleOpacity = flattenStyle?.opacity as number | undefined;
  const opacity = styleOpacity !== undefined ? styleOpacity * pressedOpacity : pressedOpacity;

  return (
    <PressableRN
      disabled={disabled}
      style={({ pressed }) => [flattenStyle, (disabled || pressed) && { opacity }]}
      {...rest}
      ref={ref}
    >
      {children}
    </PressableRN>
  );
};

export default forwardRef(Pressable);
