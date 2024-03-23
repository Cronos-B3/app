import { DEVICE } from 'constants/config';
import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'contexts/ThemeContext';
import { router, useSegments } from 'expo-router';
import { TabBarBackground, TabBarHome, TabBarMenu, TabBarProfile } from 'assets/svg/TabBar';
import Pressable from 'components/atoms/Pressable/Pressable';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HEIGHT_TAB_BAR = (120 / 390) * DEVICE.width;

const TabBar = () => {
  if (__DEV__) console.log('🐙 - TabBar');

  const { colors } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const segments = useSegments();

  const backgroundMemo = useMemo(() => {
    return <TabBarBackground color={colors.background} />;
  }, []);

  const menuMemo = useMemo(() => {
    return (
      <Pressable style={[s.innerButton, { backgroundColor: colors.primary }]}>
        <TabBarMenu color={colors.light} height={'45%'} />
      </Pressable>
    );
  }, []);

  const insetBottom = bottom / 2;
  const bottomPlacement = (50 / 390) * DEVICE.width - insetBottom;

  return (
    <View
      style={[
        {
          height: HEIGHT_TAB_BAR,
          bottom: -bottomPlacement
        },
        s.container
      ]}
    >
      {backgroundMemo}
      <View style={[s.navigationContainer, { paddingBottom: bottomPlacement + insetBottom }]}>
        <Pressable
          style={s.navigation}
          onPress={() => router.navigate('/a/home')}
          pressedOpacity={1}
        >
          <TabBarHome
            color={colors.light}
            height={'45%'}
            opacity={segments[2] === 'home' ? 1 : 0.6}
          />
        </Pressable>
        <Pressable
          style={s.navigation}
          onPress={() => router.navigate('/a/profile')}
          pressedOpacity={1}
        >
          <TabBarProfile
            color={colors.light}
            height={'45%'}
            opacity={segments[2] === 'profile' ? 1 : 0.6}
          />
        </Pressable>
      </View>
      {menuMemo}
    </View>
  );
};

export default TabBar;

const s = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  innerButton: {
    top: '-33%',
    position: 'absolute',
    width: '18%',
    aspectRatio: 1,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navigationContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    gap: DEVICE.width * 0.2
  },
  navigation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
