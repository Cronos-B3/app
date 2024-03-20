import React from 'react';
import { View, StyleSheet, ScrollView, ViewProps } from 'react-native';

const ViewDismissKeyboard = ({ children, style = { flex: 1 }, ...rest }: ViewProps) => {
  // if (__DEV__) console.log('🐙 - ViewDismissKeyboard');

  return (
    <View {...rest} style={style}>
      <ScrollView
        contentContainerStyle={s.scrollView}
        scrollEnabled={false}
        automaticallyAdjustKeyboardInsets={false}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default ViewDismissKeyboard;

const s = StyleSheet.create({
  scrollView: {
    flex: 1
  }
});
