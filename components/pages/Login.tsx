import { Trans, useTranslation } from 'react-i18next';
import { YStack } from 'tamagui';
import FormInput from '../molecules/FormInput';
import LoadingButton from '../molecules/LoadingButton';
import Text from '../atoms/Text';
import { DEVICE } from '@/constants/config';
import { Keyboard } from 'react-native';

export default function LoginPage() {
  if (__DEV__) console.log('📃 - LoginPage');

  const { t } = useTranslation('auth');

  return (
    <YStack
      height={'80%'}
      paddingHorizontal="5%"
      justifyContent="space-evenly"
      onPress={() => Keyboard.dismiss()}>
      <YStack gap={DEVICE.height * 0.04} paddingHorizontal="2.5%">
        <FormInput type="identifier" />
        <YStack>
          <FormInput type="password" />
          <Text fontSize={'$2'} color={'$inversed75'} alignSelf="flex-end">
            {t('forgot_password')}
          </Text>
        </YStack>
      </YStack>
      <YStack>
        <LoadingButton>{t('login')}</LoadingButton>
        <Text fontSize={'$2'} color={'$inversed75'} alignSelf="center">
          <Trans
            t={t}
            i18nKey="no_account"
            components={{ underline: <Text unstyled textDecorationLine="underline" /> }}
          />
        </Text>
      </YStack>
    </YStack>
  );
}
