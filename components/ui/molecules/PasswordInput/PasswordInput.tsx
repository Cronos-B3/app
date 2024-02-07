import React, { ForwardRefRenderFunction, forwardRef, useMemo, useState } from 'react';
import Input, { InputProps } from 'components/ui/molecules/Input/Input';
import { StyleSheet, TextInput } from 'react-native';
import { EyeClose, EyeOpen } from 'assets/svg/Eye';
import Pressable from 'components/ui/atoms/Pressable/Pressable';
import { isPasswordValid } from 'lib/dataValidation';
import { COLOR_RED, COLOR_WHITE } from 'constants/Colors';
import { useTranslate } from 'contexts/TranslateContext';

type CustomProps = {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordValid: boolean;
  setPasswordValid: React.Dispatch<React.SetStateAction<boolean>>;
};

type PasswordInputProps = CustomProps & InputProps;

const PasswordInput: ForwardRefRenderFunction<TextInput, PasswordInputProps> = (
  { password, setPassword, passwordValid, setPasswordValid, ...rest },
  ref
) => {
  if (__DEV__) console.log('🐙 - PasswordInput');

  const { text } = useTranslate();

  const [showPassword, setShowPassword] = useState<boolean>(() => false);

  const memoizedEye = useMemo(() => {
    return (
      <Pressable style={s.container} onPress={() => setShowPassword(!showPassword)}>
        {showPassword ? (
          <EyeOpen color={`${COLOR_WHITE}80`} />
        ) : (
          <EyeClose color={`${COLOR_WHITE}60`} />
        )}
      </Pressable>
    );
  }, [showPassword]);

  return (
    <Input
      {...rest}
      label={`${text.label.password}${!passwordValid ? ` (${text.format.required})` : ''}`}
      labelStyle={!passwordValid && { color: COLOR_RED }}
      placeholder={text.placeholder.password}
      textInputStyle={!passwordValid && { color: COLOR_RED }}
      value={password}
      onChangeText={(text) => {
        setPassword(text);
        if (!passwordValid) setPasswordValid(isPasswordValid(password));
      }}
      onBlur={() => setPasswordValid(isPasswordValid(password))}
      secureTextEntry={!showPassword}
      ref={ref}
      rightIcon={memoizedEye}
    />
  );
};

export default forwardRef(PasswordInput);

const s = StyleSheet.create({
  container: {
    width: '13%',
    height: '100%',
    paddingRight: '5%'
  }
});
