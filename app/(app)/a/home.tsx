import React from 'react';
import { View, StyleSheet } from 'react-native';
import Post from 'components/molecules/Post/Post';

export default () => {
  if (__DEV__) console.log('🏳️ - home');

  return (
    <View style={s.container}>
      <Post />
    </View>
  );
};

const s = StyleSheet.create({
  container: { flex: 1 }
});
