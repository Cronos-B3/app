import { StyleSheet, TextInput } from 'react-native';
import { useTheme } from 'contexts/ThemeContext';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { useTranslation } from 'react-i18next';
import Input, { InputProps } from './Input';

export interface StyledInputProps extends InputProps {
  type: string;
  error?: string;
}

const TRANSFORM_ERROR: { [key: string]: string } = {
  minLength: 'min_length'
};

const StyledInput: ForwardRefRenderFunction<TextInput, StyledInputProps> = (
  { type, error, inputStyle, labelStyle, placeholder, ...props },
  ref
) => {
  // if (__DEV__) console.log('🐙 - StyledInput');
  // if (__DEV__) console.log('⛔️ - Error: ', error);

  const { colors } = useTheme();
  const { t } = useTranslation('data');

  if (error) error = TRANSFORM_ERROR[error] ?? error;

  return (
    <Input
      ref={ref}
      inputStyle={[
        s.input,
        { borderBottomColor: `${colors.light}60` },
        inputStyle,
        !!error && { borderBottomColor: colors.error }
      ]}
      label={t(`${type}.label`) + (error ? ` (${t(`format.${error}`)})` : '')}
      labelStyle={[labelStyle, !!error && { color: colors.error }]}
      placeholder={placeholder || t(`${type}.placeholder`)}
      {...props}
    />
  );
};

export default forwardRef(StyledInput);

const s = StyleSheet.create({
  input: { borderBottomWidth: 1 }
});
