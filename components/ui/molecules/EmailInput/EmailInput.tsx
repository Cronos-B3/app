import React, { ForwardRefRenderFunction, forwardRef } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Input, { InputProps } from 'components/ui/molecules/Input/Input';
import { isEmailValid } from 'lib/dataValidation';
import { COLOR_RED } from 'constants/Colors';
import { useTranslate } from 'contexts/TranslateContext';

type CustomProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  wrongEmail: boolean;
  setWrongEmail: React.Dispatch<React.SetStateAction<boolean>>;
  emailValid: boolean;
  setEmailValid: React.Dispatch<React.SetStateAction<boolean>>;
};

type EmailInputProps = CustomProps & InputProps;

const EmailInput: ForwardRefRenderFunction<TextInput, EmailInputProps> = (
  { email, setEmail, wrongEmail, setWrongEmail, emailValid, setEmailValid, ...rest },
  ref
) => {
  const { text } = useTranslate();

  if (__DEV__) console.log('🐙 - EmailInput');

  return (
    <Input
      label={`${text.label.email}${!emailValid ? ` (${text.format.invalid})` : ''}`}
      labelStyle={!emailValid && { color: COLOR_RED }}
      placeholder={text.placeholder.email}
      textInputStyle={!emailValid && wrongEmail && { color: COLOR_RED }}
      value={email}
      onChangeText={(text) => {
        setEmail(text);
        setWrongEmail(false);
        if (!emailValid) setEmailValid(isEmailValid(email));
      }}
      onBlur={() => {
        const isValid = isEmailValid(email);
        setEmailValid(isValid);
        setWrongEmail(!isValid);
      }}
      autoCapitalize="none"
      {...rest}
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
