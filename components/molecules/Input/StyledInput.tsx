import { StyleSheet, TextInput } from 'react-native';
import Input, { InputProps } from './Input';
import { useTheme } from 'contexts/ThemeContext';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { useTranslation } from 'react-i18next';

export interface StyledInputProps extends InputProps {
  type?: string;
  error?: string;
}

const TRANSFORM_ERROR: { [key: string]: string } = {
  minLength: 'min_length'
};

const StyledInput: ForwardRefRenderFunction<TextInput, StyledInputProps> = (
  { type = '', error, placeholder, inputStyle, label, labelStyle, ...props },
  ref
) => {
  // if (__DEV__) console.log('🐙 - StyledInput');

  const { colors } = useTheme();
  const { t } = useTranslation('input');

  if (error) error = TRANSFORM_ERROR[error] ?? error;

  return (
    <Input
      ref={ref}
      placeholder={placeholder ?? t(`${type}.placeholder`)}
      inputStyle={[
        s.input,
        { borderBottomColor: `${colors.light}60` },
        inputStyle,
        !!error && { borderBottomColor: colors.error }
      ]}
      label={(label ?? t(`${type}.label`)) + (error ? ` (${t(`format.${error}`)})` : '')}
      labelStyle={[labelStyle, !!error && { color: colors.error }]}
      {...props}
    />
  );
};

export default forwardRef(StyledInput);

const s = StyleSheet.create({
  input: { borderBottomWidth: 1 }
});
