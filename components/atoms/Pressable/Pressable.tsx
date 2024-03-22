import React, { ForwardRefRenderFunction, forwardRef } from 'react';
import {
  StyleSheet,
  Pressable as PressableRN,
  PressableProps as PressablePropsRN,
  ViewStyle,
  View,
  ViewProps
} from 'react-native';

export interface PressableProps extends PressablePropsRN {
  pressedOpacity?: number;
  style?: ViewProps['style'];
}

const Pressable: ForwardRefRenderFunction<View, PressableProps> = (
  { children, style, disabled, pressedOpacity = 0.6, ...rest },
  ref
) => {
  // if (__DEV__) console.log('🐙 - Pressable');

  const flattenStyle = StyleSheet.flatten(style as ViewProps['style']) as ViewStyle;

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
