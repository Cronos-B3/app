import React, { ForwardRefRenderFunction, forwardRef } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Pressable, { PressableProps } from 'components/atoms/Pressable/Pressable';
import { useTheme } from 'contexts/ThemeContext';

type CustomProps = {
  loading?: boolean;
  loadingSize?: number;
};

type LoadingButtonProps = CustomProps & PressableProps;

const LoadingButton: ForwardRefRenderFunction<View, LoadingButtonProps> = (
  { disabled, loading = false, loadingSize = 20, children, ...rest },
  ref
) => {
  // if (__DEV__) console.log('🐙 - LoadingButton');

  const { colors } = useTheme();

  return (
    <Pressable
      ref={ref}
      disabled={disabled || loading}
      pressedOpacity={loading ? 1 : undefined}
      {...rest}
    >
      {loading ? <ActivityIndicator color={colors.light} size={loadingSize} /> : children}
    </Pressable>
  );
};

export default forwardRef(LoadingButton);

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff'
  },
  text: {
    fontSize: 20,
    color: 'black'
  }
});
