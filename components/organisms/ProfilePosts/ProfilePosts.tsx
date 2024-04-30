import Text from 'components/atoms/BaseText/Text';
import { DEVICE } from 'constants/config';
import { t } from 'i18next';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProfilePosts = () => {
  if (__DEV__) console.log('🐙 - ProfilePosts');

  return (
    <View>
      <Text style={s.title} font="bold">
        {t('app:posts')}
      </Text>
      <View style={s.notFoundContainer}>
        <Text style={s.notFound}>{t('app:not_found')}</Text>
      </View>
    </View>
  );
};

export default ProfilePosts;

const s = StyleSheet.create({
  title: { fontSize: 26 },
  notFoundContainer: {
    height: DEVICE.height * 0.1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notFound: { fontSize: 22 }
});
