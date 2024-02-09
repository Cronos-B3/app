import React, { ForwardRefRenderFunction, forwardRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Input, { InputProps } from 'components/ui/molecules/Input/Input';
import { requiredString } from 'lib/dataValidation';
import { useTranslate } from 'contexts/TranslateContext';
import { useTheme } from 'contexts/ThemeContext';

type CustomProps = {
  log: string;
  setLog: React.Dispatch<React.SetStateAction<string>>;
  wrongLog: boolean;
  setWrongLog: React.Dispatch<React.SetStateAction<boolean>>;
  logValid: boolean;
  setLogValid: React.Dispatch<React.SetStateAction<boolean>>;
};

type LoginInputProps = CustomProps & InputProps;

const LoginInput: ForwardRefRenderFunction<TextInput, LoginInputProps> = (
  { log, setLog, wrongLog, setWrongLog, logValid, setLogValid, ...rest },
  ref
) => {
  const { text } = useTranslate();
  const { colors } = useTheme();

  if (__DEV__) console.log('🐙 - LoginInput');

  return (
    <Input
      label={`${text.label.log}${!logValid ? ` (${text.format.required})` : ''}`}
      labelStyle={!logValid && { color: colors.error }}
      placeholder={text.placeholder.log}
      textInputStyle={!logValid && wrongLog && { color: colors.error }}
      value={log}
      onChangeText={(text) => {
        setLog(text);
        if (!logValid) setLogValid(requiredString(log));
      }}
      onBlur={() => setLogValid(requiredString(log))}
      autoCapitalize="none"
      {...rest}
      ref={ref}
    />
  );
};

export default forwardRef(LoginInput);

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
