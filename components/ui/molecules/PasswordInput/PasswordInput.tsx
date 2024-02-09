import React, { ForwardRefRenderFunction, forwardRef, useMemo, useState } from 'react';
import Input, { InputProps } from 'components/ui/molecules/Input/Input';
import { StyleSheet, TextInput } from 'react-native';
import { EyeClose, EyeOpen } from 'assets/svg/Eye';
import Pressable from 'components/ui/atoms/Pressable/Pressable';
import { requiredString } from 'lib/dataValidation';
import { useTranslate } from 'contexts/TranslateContext';
import { useTheme } from 'contexts/ThemeContext';

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
  const { colors } = useTheme();

  const [showPassword, setShowPassword] = useState<boolean>(() => false);

  const memoizedEye = useMemo(() => {
    return (
      <Pressable style={s.container} onPress={() => setShowPassword(!showPassword)}>
        {showPassword ? (
          <EyeOpen color={`${colors.light}80`} />
        ) : (
          <EyeClose color={`${colors.light}60`} />
        )}
      </Pressable>
    );
  }, [showPassword]);

  return (
    <Input
      {...rest}
      label={`${text.label.password}${!passwordValid ? ` (${text.format.required})` : ''}`}
      labelStyle={!passwordValid && { color: colors.error }}
      placeholder={text.placeholder.password}
      textInputStyle={!passwordValid && { color: colors.error }}
      value={password}
      onChangeText={(text) => {
        setPassword(text);
        if (!passwordValid) setPasswordValid(requiredString(password));
      }}
      onBlur={() => setPasswordValid(requiredString(password))}
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
