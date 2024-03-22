import { StyleSheet, TextInput } from 'react-native';
import { useTheme } from 'contexts/ThemeContext';
import { forwardRef, ForwardRefRenderFunction, useMemo, useState } from 'react';
import StyledInput, { StyledInputProps } from 'components/molecules/Input/StyledInput';
import Pressable from 'components/atoms/Pressable/Pressable';
import { EyeClose, EyeOpen } from 'assets/svg/Eye';

const StylePasswordInput: ForwardRefRenderFunction<TextInput, StyledInputProps> = (
  { ...props },
  ref
) => {
  // if (__DEV__) console.log('🐙 - StylePasswordInput');

  const { colors } = useTheme();

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

  return <StyledInput ref={ref} {...props} secureTextEntry={!visible} rightIcon={eyeMemo} />;
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
