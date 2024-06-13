import { YStack } from 'tamagui';
import LoadingButton from '../molecules/LoadingButton';
import ModalTemplate from '../templates/ModalTemplate';
import { DEVICE } from '@/constants/config';
import { Info, LogOut, Mail, User } from '@tamagui/lucide-icons';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { MODALR } from '@/constants/routes';

export default function SettingsModal() {
  if (__DEV__) console.log('📃 - SettingsModal');

  const { t } = useTranslation();

  return (
    <ModalTemplate title={t('app:settings')} justifyContent="space-between" paddingBottom={'10%'}>
      <YStack gap={DEVICE.height * 0.025}>
        <LoadingButton customSize="large" icon={<User size={'$4'} strokeWidth={1.5} />}>
          {t('app:myAccount')}
        </LoadingButton>
        <LoadingButton customSize="large" icon={<Mail size={'$4'} strokeWidth={1.5} />}>
          {t('static:contact')}
        </LoadingButton>
        <LoadingButton customSize="large" icon={<Info size={'$4'} strokeWidth={1.5} />}>
          {t('static:about')}
        </LoadingButton>
      </YStack>
      <LoadingButton customSize="large" red icon={<LogOut size={'$4'} strokeWidth={1.5} />}>
        {t('auth:logout')}
      </LoadingButton>
    </ModalTemplate>
  );
}
