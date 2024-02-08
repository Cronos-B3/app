import React, { useEffect } from 'react';
import Text from 'components/ui/atoms/Text/Text';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default () => {
  if (__DEV__) console.log('🏳️ - index');

  useEffect(() => {
    // Ensure that navigation only occurs after the component is mounted
    const timer = setTimeout(() => {
      // TODO: IF USER IS LOGGED IN, REDIRECT TO HOME ELSE REDIRECT TO LOGIN
      router.replace('/login');
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={s.container}>
      <Text style={s.text}>Page index</Text>
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
