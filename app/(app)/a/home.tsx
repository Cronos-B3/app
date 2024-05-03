import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useUserStore } from 'hooks/store/useUserStore';
import Post from 'components/molecules/Post/Post';
import { Redirect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEVICE } from 'constants/config';
import { useCronStore } from 'hooks/store/useCronStore';
import { FlashList } from '@shopify/flash-list';

export default () => {
  if (__DEV__) console.log('🏳️  - home');

  const { top, bottom } = useSafeAreaInsets();

  const { user } = useUserStore();
  const { crons } = useCronStore();

  if (!user) return <Redirect href={'/a/login'} />;

  return (
    <View style={{ flex: 1, marginTop: top, marginBottom: bottom, paddingHorizontal: '5%' }}>
      <FlashList
        key={crons.length}
        estimatedListSize={{ height: DEVICE.height, width: DEVICE.width * 0.92 }}
        estimatedItemSize={DEVICE.height * 0.18}
        keyExtractor={(item, index) => index.toString()}
        data={crons}
        renderItem={({ item: cron }) => {
          return <Post {...cron} />;
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5%'
  }
});
