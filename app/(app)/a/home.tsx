import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { HEIGHT_TAB_BAR } from 'components/organisms/TabBar/TabBar';
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
    <ScrollView
      style={[s.container, { marginTop: top }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: HEIGHT_TAB_BAR + bottom }}
    >
      <View style={{ paddingHorizontal: '4%' }}>
        <FlashList
          estimatedListSize={{ height: DEVICE.height, width: DEVICE.width }}
          estimatedItemSize={DEVICE.height * 0.2}
          keyExtractor={(item) => item.id}
          data={crons}
          renderItem={({ item: cron }) => {
            return <Post {...cron} />;
          }}
        />
      </View>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5%'
  }
});
