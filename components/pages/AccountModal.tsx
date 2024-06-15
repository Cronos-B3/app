import { useTranslation } from 'react-i18next';
import LoadingButton from '../molecules/LoadingButton';
import ModalTemplate from '../templates/ModalTemplate';
import { FileLock, LogOut } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import { MODALR } from '@/constants/routes';
import { useState } from 'react';
import DeleteAccountModal from './DeleteAccountModal';

export default function AccountModal() {
  if (__DEV__) console.log('📃 - AccountModal');

  const { t } = useTranslation('app');

  const [openModalDeleteAccount, setOpenModalDeleteAccount] = useState(() => false);

  return (
    <>
      <DeleteAccountModal
        isVisible={openModalDeleteAccount}
        onClose={() => setOpenModalDeleteAccount(false)}
      />
      <ModalTemplate title={t('myAccount')} justifyContent="space-between" bottomPadding>
        <LoadingButton
          customSize="large"
          icon={<FileLock size={'$4'} strokeWidth={1.5} />}
          onPress={() => router.push(MODALR.changePassword)}>
          {t('changePassword')}
        </LoadingButton>
        <LoadingButton
          customSize="large"
          red
          icon={<LogOut size={'$4'} strokeWidth={1.5} />}
          onPress={() => setOpenModalDeleteAccount(true)}>
          {t('deleteAccount.title')}
        </LoadingButton>
      </ModalTemplate>
    </>
  );
}
