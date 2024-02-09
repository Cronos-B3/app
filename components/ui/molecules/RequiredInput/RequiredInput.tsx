import React, { ForwardRefRenderFunction, forwardRef } from 'react';
import { TextInput } from 'react-native';
import Input, { InputProps } from '../Input/Input';
import { useTheme } from 'contexts/ThemeContext';
import { useTranslate } from 'contexts/TranslateContext';
import { requiredString } from 'lib/dataValidation';

export type StateProps = {
  text: string;
  exist: boolean;
};

type CustomProps = {
  state: StateProps;
  setState: React.Dispatch<React.SetStateAction<StateProps>>;
};

export type RequiredInputProps = CustomProps & InputProps;

const RequiredInput: ForwardRefRenderFunction<TextInput, RequiredInputProps> = (
  { state, setState, onChangeText, onBlur, label, labelStyle, style, inputStyle, ...rest },
  ref
) => {
  if (__DEV__) console.log('🐙 - RequiredInput');

  const { colors } = useTheme();
  const { text } = useTranslate();

  return (
    <Input
      label={`${label}${!state.exist ? ` (${text.format.required})` : ''}`}
      labelStyle={[labelStyle, !state.exist && { color: colors.error }]}
      value={state.text}
      onChangeText={(text) => {
        setState((prev) => {
          if (!prev.exist) prev.exist = requiredString(text);
          return { ...prev, text };
        });
        onChangeText && onChangeText(text);
      }}
      onBlur={(e) => {
        setState((prev) => ({ ...prev, exist: requiredString(state.text) }));
        onBlur && onBlur(e);
      }}
      style={[style, !state.exist && { borderColor: colors.error }]}
      inputStyle={[inputStyle, !state.exist && { borderColor: colors.error }]}
      {...rest}
      ref={ref}
    />
  );
};

export default forwardRef(RequiredInput);
