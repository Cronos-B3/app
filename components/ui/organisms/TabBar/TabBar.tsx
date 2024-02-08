import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabBarBackground, TabBarHome, TabBarMenu, TabBarProfile } from 'assets/svg/TabBar';
import Pressable from 'components/ui/atoms/Pressable/Pressable';
import { router } from 'expo-router';
import { useTheme } from 'contexts/ThemeContext';
import { DEVICE } from 'constants/Config';
import { NavigationHelpers, ParamListBase, TabNavigationState } from '@react-navigation/native';
import { EdgeInsets } from 'react-native-safe-area-context';

type TabBarProps = {
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase, any>;
  insets: EdgeInsets;
};

const TabBar = ({ state, navigation, insets }: TabBarProps) => {
  if (__DEV__) console.log('🐙 - TabBar');

  const { colors } = useTheme();

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
        onPress={() => navigation.navigate('home')}
        pressedOpacity={1}
      >
        <TabBarHome color={colors.light} height={'45%'} opacity={state.index === 0 ? 1 : 0.6} />
      </Pressable>
    );
  }, [colors, navigation, state.index]);

  const memoizedProfile = useMemo(() => {
    return (
      <Pressable
        style={[s.item, s.right]}
        // TODO: replace with the user's profile (username)
        onPress={() => router.replace('/cezgain')}
        pressedOpacity={1}
      >
        <TabBarProfile
          color={colors.light}
          height={'45%'}
          // TODO: Opacity should be 1 if the user is on his profile page
          opacity={state.index === 1 ? 1 : 0.6}
        />
      </Pressable>
    );
  }, [colors, state.index]);

  return (
    <View
      style={[
        {
          height: (70 / 390) * DEVICE.width + insets.bottom,
          paddingBottom: insets.bottom
        },
        s.container
      ]}
    >
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
