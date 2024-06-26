import Image from 'components/atoms/Image/Image';
import Pressable from 'components/atoms/Pressable/Pressable';
import Text from 'components/atoms/BaseText/Text';
import { DEVICE } from 'constants/config';
import { UserType } from 'hooks/store/useUserStore';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Dots from 'assets/svg/Dots';
import { useTheme } from 'contexts/ThemeContext';
import { t } from 'i18next';

type ProfileInformationsProps = {
  profile: UserType;
};

const ProfileInformations = ({ profile }: ProfileInformationsProps) => {
  if (__DEV__) console.log('🐙 - ProfileInformations');

  const { colors } = useTheme();

  return (
    <View style={s.container}>
      <Image style={s.profilePicture} source={profile.profile_picture} />
      <View style={s.data}>
        <View>
          <Text style={s.username} numberOfLines={1}>
            @{profile.username}
          </Text>
          <Text style={s.nickname} font="bold" numberOfLines={1}>
            {profile.nickname}
          </Text>
        </View>
        <Text style={s.followers}>
          {0} {t('app:followers')}
        </Text>
        <View style={s.buttonsContainer}>
          <Pressable style={s.followButton}>
            <Text style={s.followers} numberOfLines={1}>
              {t('app:follow')}
            </Text>
          </Pressable>
          <Pressable style={s.moreButton}>
            <Dots color={colors.light} height="50%" width="50%" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ProfileInformations;

const s = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 2.1,
    flexDirection: 'row',
    paddingVertical: '5%',
    gap: DEVICE.width * 0.05
  },
  profilePicture: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 99
  },
  data: {
    flex: 2.2,
    gap: 12
  },
  username: { fontSize: 15 },
  nickname: { fontSize: 23 },
  followers: { fontSize: 17 },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: DEVICE.width * 0.05
  },
  followButton: {
    flex: 1.5,
    backgroundColor: '#9F62E4',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  moreButton: {
    height: '100%',
    aspectRatio: 1,
    backgroundColor: '#9F62E4',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
