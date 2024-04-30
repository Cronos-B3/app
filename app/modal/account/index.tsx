import { BoxArrowRight } from 'assets/svg/Arrow';
import Locked from 'assets/svg/Locked';
import SettingsButton from 'components/molecules/SettingsButton/SettingsButton';
import ModalTemplate from 'components/templates/ModalTemplate/ModalTemplate';
import { DEVICE } from 'constants/config';
import { router } from 'expo-router';
import { t } from 'i18next';
import { View, StyleSheet } from 'react-native';

export default () => {
  if (__DEV__) console.log('🏳️  - index');

  return (
    <ModalTemplate title={t('settings:account.title')} style={s.container}>
      <View style={s.otherModal}>
        <SettingsButton Icon={Locked} onPress={() => router.push('/modal/account/change-password')}>
          {t('settings:account.edit_password')}
        </SettingsButton>
      </View>
      <SettingsButton isRed Icon={BoxArrowRight} onPress={() => {}}>
        {t('settings:account.delete')}
      </SettingsButton>
    </ModalTemplate>
  );
};

const s = StyleSheet.create({
  container: { justifyContent: 'space-between' },
  otherModal: { gap: DEVICE.height * 0.015 }
});
