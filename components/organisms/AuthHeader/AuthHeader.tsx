import React from 'react';
import { StyleSheet, View } from 'react-native';
import Pressable from 'components/atoms/Pressable/Pressable';
import { LeftArrow } from 'assets/svg/Arrow';
import { Image } from 'expo-image';
import IMAGES from 'constants/images';
import { DEVICE } from 'constants/config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'contexts/ThemeContext';
import { router } from 'expo-router';
import { gs } from 'constants/styles';

const AuthHeader = () => {
  if (__DEV__) console.log('🐙 - AuthHeader');

  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();

  return (
    <View style={[s.container, { marginTop: top }]}>
      {router.canGoBack() && (
        <Pressable style={s.back} onPress={() => router.back()}>
          <LeftArrow color={colors.light} />
        </Pressable>
      )}
      <Image source={IMAGES.logo} style={gs.flex} contentFit="contain" />
    </View>
  );
};

export default AuthHeader;

const s = StyleSheet.create({
  container: {
    height: DEVICE.height * 0.25,
    width: '100%',
    paddingVertical: '8%'
  },
  back: {
    position: 'absolute',
    height: '22%',
    aspectRatio: 1,
    left: '10%',
    top: '30%'
  }
});
