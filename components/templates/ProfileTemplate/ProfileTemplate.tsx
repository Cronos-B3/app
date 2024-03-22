import { LeftArrow } from 'assets/svg/Arrow';
import Image from 'components/atoms/Image/Image';
import Pressable from 'components/atoms/Pressable/Pressable';
import Text from 'components/atoms/BaseText/Text';
import ProfileInformations from 'components/organisms/ProfileInformations/ProfileInformations';
import ProfilePosts from 'components/organisms/ProfilePosts/ProfilePosts';
import { DEVICE } from 'constants/config';
import { router } from 'expo-router';
import { UserType } from 'hooks/store/useUserStore';
import React, { useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ProfileTemplateProps = {
  profile: UserType;
};

const ProfileTemplate = ({ profile }: ProfileTemplateProps) => {
  if (__DEV__) console.log('🐙 - ProfileTemplate');

  const { top } = useSafeAreaInsets();

  const backMemo = useMemo(() => {
    if (!router.canGoBack()) return null;

    return (
      <Pressable style={s.backContainer} onPress={() => router.back()}>
        <LeftArrow color="white" height="50%" width="33%" />
      </Pressable>
    );
  }, [router.canGoBack]);

  return (
    <View style={[s.flex, { marginTop: top }]}>
      <ScrollView>
        <Image containerStyle={s.bannerBackground} source={''} />
        <View style={s.contentContainer}>
          <ProfileInformations profile={profile} />
          <ProfilePosts />
        </View>
      </ScrollView>
      {backMemo}
    </View>
  );
};

export default ProfileTemplate;

const s = StyleSheet.create({
  flex: { flex: 1 },
  backContainer: {
    position: 'absolute',
    top: '3%',
    height: '6%',
    width: '20%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderBottomRightRadius: 99,
    borderTopRightRadius: 99,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bannerBackground: {
    height: DEVICE.height * 0.175,
    width: '100%',
    backgroundColor: 'white'
  },
  contentContainer: {
    paddingHorizontal: '4%',
    gap: DEVICE.height * 0.05
  }
});
