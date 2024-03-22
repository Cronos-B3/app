import React from 'react';
import Text from 'components/atoms/BaseText/Text';
import { View, StyleSheet } from 'react-native';
import Post from 'components/molecules/Post/Post';

export default () => {
  if (__DEV__) console.log('🏳️ - home');

  return (
    <View style={s.container}>
      <Text style={s.text}>Page home</Text>
      <Post username="azeaze" description={'azeazeazeazeazeaezaezaez'} />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: { fontSize: 20 }
});
