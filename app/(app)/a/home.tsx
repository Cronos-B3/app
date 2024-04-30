import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { HEIGHT_TAB_BAR } from 'components/organisms/TabBar/TabBar';
import { useUserStore } from 'hooks/store/useUserStore';
import Post from 'components/molecules/Post/Post';
import { Redirect } from 'expo-router';
import moment from 'moment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEVICE } from 'constants/config';

export default () => {
  if (__DEV__) console.log('🏳️  - home');

  const { user } = useUserStore();

  if (!user) return <Redirect href={'/a/login'} />;

  const { top, bottom } = useSafeAreaInsets();

  return (
    <ScrollView
      style={[s.container, { marginTop: top }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: HEIGHT_TAB_BAR + bottom }}
    >
      <View style={{ paddingHorizontal: '4%', gap: DEVICE.height * 0.033 }}>
        <Post
          postProfile={{ profile_picture: user.profile_picture, nickname: user.nickname }}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget nunc nec purus."
          timeLeft="2024-03-25 12:09:44"
          liked
          upvoted
        />
        <Post
          postProfile={{ profile_picture: user.profile_picture, nickname: user.nickname }}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget nunc nec purus."
          timeLeft="2024-03-25 12:09:44"
          liked
          upvoted
        />
        <Post
          postProfile={{ profile_picture: user.profile_picture, nickname: user.nickname }}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget nunc nec purus."
          timeLeft="2024-03-25 12:09:44"
          liked
          upvoted
        />
        <Post
          postProfile={{ profile_picture: user.profile_picture, nickname: user.nickname }}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget nunc nec purus."
          timeLeft="2024-03-25 12:09:44"
          liked
          upvoted
        />
        <Post
          postProfile={{ profile_picture: user.profile_picture, nickname: user.nickname }}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget nunc nec purus."
          timeLeft="2024-03-25 12:09:44"
          liked
          upvoted
        />
        <Post
          postProfile={{ profile_picture: user.profile_picture, nickname: user.nickname }}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget nunc nec purus."
          timeLeft="2024-03-25 12:09:44"
          liked
          upvoted
        />
        <Post
          postProfile={{ profile_picture: user.profile_picture, nickname: user.nickname }}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget nunc nec purus."
          timeLeft="2024-03-25 12:09:44"
          liked
          upvoted
        />
        <Post
          postProfile={{ profile_picture: user.profile_picture, nickname: user.nickname }}
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget nunc nec purus."
          timeLeft="2024-03-25 12:09:44"
          liked
          upvoted
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
