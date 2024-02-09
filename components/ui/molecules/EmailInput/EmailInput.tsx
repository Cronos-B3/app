import React, { ForwardRefRenderFunction, forwardRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import  { InputProps } from 'components/ui/molecules/Input/Input';
import { isEmailValid } from 'lib/dataValidation';
import { useTranslate } from 'contexts/TranslateContext';
import { useTheme } from 'contexts/ThemeContext';
import RequiredInput, { StateProps } from '../RequiredInput/RequiredInput';

type CustomStateProps = {
  valid: boolean;
  wrong: boolean;
} & StateProps;

type CustomProps = {
  state: CustomStateProps;
  setState: React.Dispatch<React.SetStateAction<CustomStateProps>>;
};

type EmailInputProps = CustomProps & InputProps;

const EmailInput: ForwardRefRenderFunction<TextInput, EmailInputProps> = (
  { state, setState, inputStyle, ...rest },
  ref
) => {
  const { text } = useTranslate();
  const { colors } = useTheme();

  if (__DEV__) console.log('🐙 - EmailInput');

  return (
    <RequiredInput
      state={state}
      setState={setState}
      label={`${text.label.email}${
        state.exist && !state.valid ? ` (${text.format.invalid})` : ''
      }`}
      labelStyle={[!state.valid && { color: colors.error }]}
      placeholder={text.placeholder.email}
      textInputStyle={!state.valid && state.wrong && { color: colors.error }}
      onChangeText={(text) => {
        setState((prev) => {
          if (!prev.valid) prev.valid = isEmailValid(text);
          return { ...prev, wrong: false };
        });
      }}
      onBlur={() => {
        const isValid = isEmailValid(state.text);
        setState((prev) => ({ ...prev, valid: isValid, wrong: !isValid }));
      }}
      inputStyle={[inputStyle, (!state.valid || state.wrong) && { borderColor: colors.error }]}
      {...rest}
      autoCapitalize="none"
      ref={ref}
    />
  );
};

export default forwardRef(EmailInput);

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
