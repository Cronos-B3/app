import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { DEVICE } from 'constants/config';
import { HEIGHT_TAB_BAR } from 'components/organisms/TabBar/TabBar';

export default () => {
  if (__DEV__) console.log('🏳️ - home');

  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      {/* <View style={{ height: DEVICE.height * 0.3, backgroundColor: 'blue' }}></View>
      <View style={{ height: DEVICE.height * 0.3, backgroundColor: 'red' }}></View>
      <View style={{ height: DEVICE.height * 0.3, backgroundColor: 'blue' }}></View>
      <View style={{ height: DEVICE.height * 0.3, backgroundColor: 'red' }}></View>
      <View style={{ height: DEVICE.height * 0.3, backgroundColor: 'blue' }}></View>
      <View style={{ height: DEVICE.height * 0.3, backgroundColor: 'red' }}></View> */}
    </ScrollView>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: HEIGHT_TAB_BAR
  }
});
