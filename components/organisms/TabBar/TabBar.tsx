import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabBarBackground, TabBarHome, TabBarMenu, TabBarProfile } from 'assets/svg/TabBar';
import Pressable from 'components/atoms/Pressable/Pressable';
import { router, useSegments } from 'expo-router';
import { useTheme } from 'contexts/ThemeContext';
import { DEVICE } from 'constants/config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabBar = () => {
  if (__DEV__) console.log('🐙 - TabBar');

  const { colors } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const segments = useSegments();

  const memoizedBackground = useMemo(() => {
    return <TabBarBackground color={colors.background} preserveAspectRatio="none" />;
  }, [colors]);

  const memoizedMenu = useMemo(() => {
    return (
      <Pressable
        style={[{ backgroundColor: colors.primary, borderColor: `${colors.dark}60` }, s.menuButton]}
      >
        <TabBarMenu color={colors.light} height={'45%'} />
      </Pressable>
    );
  }, [colors]);

  const memoizedHome = useMemo(() => {
    return (
      <Pressable
        style={[s.item, s.left]}
        onPress={() => router.navigate('a/home')}
        pressedOpacity={1}
      >
        <TabBarHome
          color={colors.light}
          height={'45%'}
          opacity={segments[2] === 'home' ? 1 : 0.6}
        />
      </Pressable>
    );
  }, [colors, segments[2]]);

  const memoizedProfile = useMemo(() => {
    return (
      <Pressable
        style={[s.item, s.right]}
        onPress={() => router.navigate('a/profile')}
        pressedOpacity={1}
      >
        <TabBarProfile
          color={colors.light}
          height={'45%'}
          opacity={segments[2] === 'profile' ? 1 : 0.6}
        />
      </Pressable>
    );
  }, [colors, segments[2]]);

  const containerStyleMemo = useMemo(() => {
    return {
      height: (70 / 390) * DEVICE.width + bottom,
      paddingBottom: bottom
    };
  }, [bottom]);

  return (
    <View style={[containerStyleMemo, s.container]}>
      {memoizedBackground}
      {memoizedHome}
      {memoizedProfile}
      {memoizedMenu}
    </View>
  );
};

export default TabBar;

const s = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  item: {
    position: 'absolute',
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  left: { left: 0, paddingRight: '15%' },
  right: { right: 0, paddingLeft: '15%' },
  menuButton: {
    top: '-80%',
    position: 'absolute',
    width: '20%',
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
