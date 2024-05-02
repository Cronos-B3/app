import { BoxArrowRight } from 'assets/svg/Arrow';
import Informations from 'assets/svg/Informations';
import Mail from 'assets/svg/Mail';
import Profile from 'assets/svg/Profile';
import SettingsButton from 'components/molecules/SettingsButton/SettingsButton';
import ModalTemplate from 'components/templates/ModalTemplate/ModalTemplate';
import { DEVICE } from 'constants/config';
import { router } from 'expo-router';
import useUser from 'hooks/useUser';
import { t } from 'i18next';
import { StyleSheet, View } from 'react-native';

export default () => {
  if (__DEV__) console.log('🏳️  - settings');

  const { logoutUser } = useUser();

  return (
    <ModalTemplate title={t('settings:title')} style={s.container}>
      <View style={s.otherModal}>
        <SettingsButton Icon={Profile} onPress={() => router.push('/modal/account/')}>
          {t('settings:account.title')}
        </SettingsButton>
        <SettingsButton Icon={Mail}>{t('settings:contact')}</SettingsButton>
        <SettingsButton Icon={Informations}>{t('settings:about')}</SettingsButton>
      </View>
      <SettingsButton isRed Icon={BoxArrowRight} onPress={() => logoutUser()}>
        {t('settings:logout')}
      </SettingsButton>
    </ModalTemplate>
  );
};

const s = StyleSheet.create({
  container: { justifyContent: 'space-between' },
  otherModal: { gap: DEVICE.height * 0.015 }
});
