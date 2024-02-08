import { DEVICE } from 'constants/Config';
import IMAGES from 'constants/Images';
import { useTheme } from 'contexts/ThemeContext';
import { Image } from 'expo-image';
import { Tabs } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

export default () => {
  const { colors } = useTheme();

  const memoizedLogo = useMemo(() => {
    return (
      <View style={s.container}>
        <Image source={IMAGES.logo} contentFit="contain" style={s.image} />
      </View>
    );
  }, []);

  return (
    <Tabs initialRouteName="home" screenOptions={{ headerTitleStyle: { color: 'transparent' } }}>
      <Tabs.Screen
        name="home"
        options={{
          headerStyle: {
            backgroundColor: colors.background
          },
          headerLeft: () => memoizedLogo
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTransparent: true
        }}
      />
    </Tabs>
  );
};

const s = StyleSheet.create({
  container: {
    height: '100%',
    width: DEVICE.width * 0.33,
    paddingVertical: '6%'
  },
  image: { flex: 1 }
});
