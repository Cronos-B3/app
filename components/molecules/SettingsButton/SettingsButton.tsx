import { SvgProps } from 'assets/svg/types';
import Text from 'components/atoms/BaseText/Text';
import Pressable, { PressableProps } from 'components/atoms/Pressable/Pressable';
import { DEVICE } from 'constants/config';
import { useTheme } from 'contexts/ThemeContext';
import { ComponentType } from 'react';
import { View, StyleSheet } from 'react-native';

interface SettingsButtonProps extends PressableProps {
  children?: string;
  isRed?: boolean;
  Icon?: ComponentType<SvgProps>;
}

const SettingsButton = ({ children, isRed, Icon, ...props }: SettingsButtonProps) => {
  // if (__DEV__) console.log('🐙 - SettingsButton');

  const { colors } = useTheme();

  return (
    <Pressable
      style={[s.container, { backgroundColor: isRed ? colors.error : colors.secondary }]}
      {...props}
    >
      {Icon && (
        <View>
          <Icon color="white" style={s.icon} height={'50%'} />
        </View>
      )}
      <Text style={s.text}>{children}</Text>
    </Pressable>
  );
};

export default SettingsButton;

const s = StyleSheet.create({
  container: {
    height: DEVICE.height * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    flexDirection: 'row',
    gap: DEVICE.width * 0.025
  },
  text: { fontSize: 18 },
  icon: { aspectRatio: 1 }
});
