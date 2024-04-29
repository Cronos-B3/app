import { DEVICE } from 'constants/config';
import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'contexts/ThemeContext';
import { router, useSegments } from 'expo-router';
import { TabBarBackground, TabBarHome, TabBarMenu, TabBarProfile } from 'assets/svg/TabBar';
import Pressable from 'components/atoms/Pressable/Pressable';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Modify from 'assets/svg/Modify';
import Settings from 'assets/svg/Settings';
import Search from 'assets/svg/Search';

export const HEIGHT_TAB_BAR = (120 / 390) * DEVICE.width;

const TabBar = () => {
  if (__DEV__) console.log('🐙 - TabBar');

  const { colors } = useTheme();
  const { top, bottom } = useSafeAreaInsets();
  const segments = useSegments();
  const [isMenuOpened, setIsMenuOpened] = useState(() => false);

  const insetBottom = bottom / 2;
  const bottomPlacement = (50 / 390) * DEVICE.width - insetBottom;

  const backgroundMemo = useMemo(() => {
    return <TabBarBackground color={colors.background} />;
  }, []);

  const menuMemo = useMemo(() => {
    if (isMenuOpened) return null;

    return (
      <Pressable
        style={[s.buttons, s.innerButton, { backgroundColor: colors.primary }]}
        onPress={() => setIsMenuOpened(true)}
      >
        <TabBarMenu color={colors.light} height={'45%'} />
      </Pressable>
    );
  }, [isMenuOpened]);

  const navigate = (href: string) => {
    router.navigate(href);
    setIsMenuOpened(false);
  };

  const menuOpenedMemo = useMemo(() => {
    if (!isMenuOpened) return null;

    return (
      <>
        <Pressable
          style={{
            height: DEVICE.height + bottom + top,
            backgroundColor: colors.dark,
            position: 'absolute',
            width: '100%',
            opacity: 0.6
          }}
          onPress={() => setIsMenuOpened(false)}
        />
        <View
          style={[
            {
              height: HEIGHT_TAB_BAR,
              bottom: -bottomPlacement
            },
            s.container
          ]}
        >
          <Pressable
            style={[s.buttons, s.innerButton, { backgroundColor: colors.primary }]}
            onPress={() => navigate('/modal/create-post')}
          >
            <Modify color={colors.light} height={'45%'} />
          </Pressable>
          <Pressable
            style={[s.buttons, s.topLeftButton, { backgroundColor: colors.primary }]}
            onPress={() => navigate('/modal/settings')}
          >
            <Settings color={colors.light} height={'45%'} />
          </Pressable>
          <Pressable
            style={[s.buttons, s.topRightButton, { backgroundColor: colors.primary }]}
            onPress={() => navigate('/modal/search')}
          >
            <Search color={colors.light} height={'45%'} />
          </Pressable>
        </View>
      </>
    );
  }, [isMenuOpened]);

  return (
    <>
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
      {menuOpenedMemo}
    </>
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
    width: '18%'
  },
  topLeftButton: {
    top: '-75%',
    left: '31%'
  },
  topRightButton: {
    top: '-75%',
    right: '31%'
  },
  buttons: {
    position: 'absolute',
    width: '14%',
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
