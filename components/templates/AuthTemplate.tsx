import { YStack, YStackProps } from 'tamagui';
import LoadingButton, { LoadingButtonProps } from '../molecules/LoadingButton';
import { DEVICE } from '@/constants/config';
import { Keyboard } from 'react-native';
import { ReactNode } from 'react';

type AuthTemplateProps = YStackProps & {
  button?: LoadingButtonProps;
  customButton?: ReactNode;
};

export default function AuthTemplate({
  children,
  button,
  customButton,
  ...props
}: AuthTemplateProps) {
  // if (__DEV__) console.log('🐙 - AuthTemplate');

  return (
    <YStack flex={1} marginHorizontal="5%" onPress={() => Keyboard.dismiss()}>
      <YStack
        flex={1}
        justifyContent="center"
        gap={DEVICE.height * 0.06}
        marginHorizontal="2.5%"
        {...props}>
        {children}
      </YStack>
      <YStack flex={1} justifyContent="center">
        {/* Custom button for login */}
        {customButton ? customButton : <LoadingButton {...button} />}
      </YStack>
    </YStack>
  );
}
