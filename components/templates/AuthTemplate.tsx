import { YStack, YStackProps } from 'tamagui';
import LoadingButton, { LoadingButtonProps } from '../molecules/LoadingButton';
import { Keyboard } from 'react-native';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

  return (
    <YStack flex={1} marginHorizontal="5%" onPress={() => Keyboard.dismiss()}>
      <YStack flex={1} justifyContent="center" marginHorizontal="2.5%" {...props}>
        {children}
      </YStack>
      <YStack flex={1} justifyContent="center">
        {/* Custom button for login */}
        {customButton ? (
          customButton
        ) : (
          <LoadingButton {...button}>{button?.children ?? t('next')}</LoadingButton>
        )}
      </YStack>
    </YStack>
  );
}
