import { StyleSheet, TextInput } from 'react-native';
import { useTheme } from 'contexts/ThemeContext';
import { forwardRef, ForwardRefRenderFunction, useMemo, useState } from 'react';
import { EyeClose, EyeOpen } from 'assets/svg/Eye';
import { useTranslation } from 'react-i18next';
import Pressable from 'components/atoms/Pressable/Pressable';
import StyledInput, { StyledInputProps } from './StyledInput';

const StylePasswordInput: ForwardRefRenderFunction<TextInput, StyledInputProps> = (
  { type, ...props },
  ref
) => {
  // if (__DEV__) console.log('🐙 - StylePasswordInput');

  const { colors } = useTheme();
  const { t } = useTranslation('data');

  const [visible, setVisible] = useState<boolean>(() => false);

  const eyeMemo = useMemo(() => {
    return (
      <Pressable style={s.container} onPress={() => setVisible(!visible)}>
        {visible ? (
          <EyeOpen color={colors.light} height="90%" style={s.icon} opacity={0.8} />
        ) : (
          <EyeClose color={colors.light} height="90%" style={s.icon} opacity={0.6} />
        )}
      </Pressable>
    );
  }, [visible, colors.light]);

  type = type.replace('_confirmation', '.confirmation');

  return (
    <StyledInput
      ref={ref}
      secureTextEntry={!visible}
      rightIcon={eyeMemo}
      maxLength={63}
      autoCapitalize="none"
      type={type}
      placeholder={t(type + '.placeholder')}
      {...props}
    />
  );
};

export default forwardRef(StylePasswordInput);

const s = StyleSheet.create({
  container: {
    height: '100%',
    marginRight: '3%',
    justifyContent: 'center'
  },
  icon: { aspectRatio: 1 }
});
