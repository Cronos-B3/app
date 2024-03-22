import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'contexts/ThemeContext';
import Pressable, { PressableProps } from 'components/atoms/Pressable/Pressable';
import Check from 'assets/svg/Check';

interface CheckBoxProps extends PressableProps {
  check?: boolean;
  setCheck?: (value: boolean) => void;
}

const CheckBox = ({
  check = false,
  setCheck = () => null,
  onPress,
  style,
  children,
  ...rest
}: CheckBoxProps) => {
  // if (__DEV__) console.log('🐙 - CheckBox');

  const { colors } = useTheme();

  return (
    <Pressable
      {...rest}
      accessibilityRole="checkbox"
      style={[s.container, { borderColor: colors.light }, style]}
      onPress={(e) => {
        setCheck(!check);
        onPress && onPress(e);
      }}
    >
      {check && (children ?? <Check color={colors.light} height="75%" width="75%" />)}
    </Pressable>
  );
};

export default CheckBox;

const s = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
