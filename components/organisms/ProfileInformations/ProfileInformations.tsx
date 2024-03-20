import Image from 'components/atoms/Image/Image';
import Pressable from 'components/atoms/Pressable/Pressable';
import Text from 'components/atoms/Text/Text';
import { DEVICE } from 'constants/Config';
import React from 'react';
import { View, StyleSheet } from 'react-native';

type ProfileInformationsProps = {
  profile: {
    username: string;
    nickname: string;
    profilePicture: string;
    followers: number;
  };
};

const ProfileInformations = ({ profile }: ProfileInformationsProps) => {
  if (__DEV__) console.log('🐙 - ProfileInformations');

  return (
    <View style={s.container}>
      <Image style={s.profilePicture} source={profile.profilePicture} />
      <View style={s.data}>
        <View>
          <Text style={s.username} numberOfLines={1}>
            @{profile.username}
          </Text>
          <Text style={s.nickname} font="bold" numberOfLines={1}>
            {profile.nickname}
          </Text>
        </View>
        <Text style={s.followers}>{profile.followers} Followers</Text>
        <View style={s.buttonsContainer}>
          <Pressable style={s.followButton}>
            <Text style={s.followers} numberOfLines={1}>
              Follow
            </Text>
          </Pressable>
          <Pressable style={s.moreButton}></Pressable>
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
    borderRadius: 9
  }
});
