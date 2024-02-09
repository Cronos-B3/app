import React from 'react';
import Text from 'components/ui/atoms/Text/Text';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Pressable from 'components/ui/atoms/Pressable/Pressable';

export default () => {
  if (__DEV__) console.log('🏳️ - index');

  return (
    <View style={s.container}>
      <Pressable style={{}} onPress={() => router.push('/privacypolicy')}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    color: 'black'
  }
});
