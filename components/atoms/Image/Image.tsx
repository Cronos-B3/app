import { Image as ImageEI, ImageProps as ImagePropsEI } from 'expo-image';
import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

interface ImageProps extends ImagePropsEI {
  containerStyle?: ViewProps['style'];
  source?: string;
}

const Image = ({ containerStyle = s.flex, style = s.flex, source, ...props }: ImageProps) => {
  if (__DEV__) console.log('🐙 - Image');

  return (
    <View style={containerStyle}>
      <ImageEI style={style} {...props} source={{ uri: source }} />
    </View>
  );
};

export default Image;

const s = StyleSheet.create({
  flex: { flex: 1 }
});
