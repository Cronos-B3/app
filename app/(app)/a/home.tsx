import React from 'react';
import Text from 'components/atoms/Text/Text';
import { View, StyleSheet } from 'react-native';

export default () => {
  if (__DEV__) console.log('🏳️ - home');

  return (
    <View style={s.container}>
      <Text style={s.text}>Page home</Text>
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
