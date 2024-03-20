import React from 'react';
import { StyleSheet } from 'react-native';
import ViewDismissKeyboard from 'components/molecules/ViewDismissKeyboard/ViewDismissKeyboard';
import Pressable from 'components/atoms/Pressable/Pressable';
import { LeftArrow } from 'assets/svg/Arrow';
import { Image } from 'expo-image';
import IMAGES from 'constants/Images';
import { DEVICE } from 'constants/Config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'contexts/ThemeContext';

type AuthHeaderProps = {
  navigation: any;
  back?: { title: string };
};

const AuthHeader = ({ navigation, back }: AuthHeaderProps) => {
  if (__DEV__) console.log('🐙 - AuthHeader');

  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();

  return (
    <ViewDismissKeyboard
      style={[s.container, { marginTop: top, backgroundColor: colors.background }]}
    >
      {back && (
        <Pressable style={s.arrowContainer} onPress={() => navigation.goBack()}>
          <LeftArrow color={colors.light} />
        </Pressable>
      )}
      <Image source={IMAGES.logo} style={s.logo} contentFit="contain" />
    </ViewDismissKeyboard>
  );
};

export default AuthHeader;

const s = StyleSheet.create({
  container: {
    paddingTop: '4%',
    height: DEVICE.height * 0.3,
    width: '100%'
  },
  arrowContainer: {
    position: 'absolute',
    height: '14%',
    aspectRatio: 1,
    left: '10%',
    top: '10%'
  },
  logo: {
    flex: 1,
    marginTop: '12.5%',
    marginBottom: '12.5%'
  }
});
