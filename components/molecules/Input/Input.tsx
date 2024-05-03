import Text from 'components/atoms/BaseText/Text';
import TextInput, { TextInputProps } from 'components/atoms/TextInput/TextInput';
import React, { ForwardRefRenderFunction, ReactNode, forwardRef, useMemo } from 'react';
import { View, StyleSheet, TextProps, ViewProps, TextInput as TextInputRN } from 'react-native';

export interface InputProps extends TextInputProps {
  style?: ViewProps['style'];
  label?: string | ReactNode;
  labelStyle?: TextProps['style'];
  inputStyle?: ViewProps['style'];
  textInputStyle?: TextProps['style'];
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input: ForwardRefRenderFunction<TextInputRN, InputProps> = (
  {
    style = s.flex,
    label,
    labelStyle,
    inputStyle = s.flex,
    textInputStyle,
    leftIcon,
    rightIcon,
    ...rest
  },
  ref
) => {
  // if (__DEV__) console.log('🐙 - Input');

  const memoizedLabel = useMemo(() => {
    return (
      <>
        {typeof label === 'string' ? (
          <Text ellipsizeMode="tail" numberOfLines={1} style={labelStyle}>
            {label}
          </Text>
        ) : (
          label
        )}
      </>
    );
  }, [label, labelStyle]);

  return (
    <View style={style}>
      {memoizedLabel}
      <View style={[inputStyle, s.inputContainer]}>
        {leftIcon}
        <TextInput {...rest} style={[s.input, textInputStyle]} ref={ref} />
        {rightIcon}
      </View>
    </View>
  );
};

export default forwardRef(Input);

const s = StyleSheet.create({
  flex: { flex: 1 },
  inputContainer: { flex: 1, flexDirection: 'row' },
  input: {
    flex: 1,
    paddingLeft: '1%'
  }
});
