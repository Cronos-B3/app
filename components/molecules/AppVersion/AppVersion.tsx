import React from 'react';
import Text from 'components/atoms/Text/Text';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const AppVersion = () => {
  if (__DEV__) console.log('🐙 - AppVersion');

  return <Text>v{Constants.expoConfig?.version}</Text>;
};

export default AppVersion;

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
