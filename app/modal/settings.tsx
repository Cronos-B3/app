import React from 'react';
import { View, StyleSheet } from 'react-native';

export default () => {
  if (__DEV__) console.log('🏳️ - test');

  return <View style={s.container}></View>;
};

const s = StyleSheet.create({
  container: {
    bottom: 0,
    height: '50%',
    width: '100%',
    backgroundColor: 'red'
  }
});
