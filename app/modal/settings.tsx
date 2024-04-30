import { BoxArrowRight } from 'assets/svg/Arrow';
import Informations from 'assets/svg/Informations';
import Mail from 'assets/svg/Mail';
import Profile from 'assets/svg/Profile';
import SettingsButton from 'components/molecules/SettingsButton/SettingsButton';
import ModalTemplate from 'components/templates/ModalTemplate/ModalTemplate';
import { DEVICE } from 'constants/config';
import { useUserStore } from 'hooks/store/useUserStore';
import useUser from 'hooks/useUser';
import { StyleSheet, View } from 'react-native';

export default () => {
  if (__DEV__) console.log('🏳️  - settings');

  const { logoutUser } = useUser();

  return (
    <ModalTemplate title="Settings" style={s.container}>
      <View style={s.otherModal}>
        <SettingsButton Icon={Profile}>Account</SettingsButton>
        <SettingsButton Icon={Mail}>Contact us</SettingsButton>
        <SettingsButton Icon={Informations}>About us</SettingsButton>
      </View>
      <SettingsButton isRed Icon={BoxArrowRight} onPress={() => logoutUser()}>
        Logout
      </SettingsButton>
    </ModalTemplate>
  );
};

const s = StyleSheet.create({
  container: { justifyContent: 'space-between' },
  otherModal: { gap: DEVICE.height * 0.015 }
});
