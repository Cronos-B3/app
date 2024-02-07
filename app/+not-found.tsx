import React from 'react';
import Text from 'components/ui/atoms/Text/Text';
import { View, StyleSheet } from 'react-native';

export default () => {
  if (__DEV__) console.log('🏳️ - +not-found');

  return (
    <View style={s.container}>
      <Text style={s.text}>Page +not-found</Text>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff'
  },
  text: {
    fontSize: 20,
    color: 'black'
  }
});
