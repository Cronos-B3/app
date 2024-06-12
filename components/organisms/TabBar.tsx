import Home from '@/assets/svg/Home';
import Profile from '@/assets/svg/Profile';
import TabBarBackground from '@/assets/svg/TabBarBackground';
import { DEVICE } from '@/constants/config';
import { LayoutGrid } from '@tamagui/lucide-icons';
import { Button, useTheme, View, XStack, YStack } from 'tamagui';
import { NavigationHelpers, ParamListBase } from '@react-navigation/native';
import type { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { router } from 'expo-router';
import { MODALR } from '@/constants/routes';
import ButtonTabBar from '../molecules/ButtonTabBar';

type TabBarProps = {
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  tabIndex: number;
  insetBottom: number;
};

export const TAB_BAR_HEIGHT = (DEVICE.width * 64) / 390;

export default function TabBar({ navigation, tabIndex, insetBottom }: TabBarProps) {
  // if (__DEV__) console.log('🐙 - TabBar');

  const { notInversedBackground: background, inversed } = useTheme();

  return (
    <YStack
      height={TAB_BAR_HEIGHT + insetBottom}
      width={DEVICE.width}
      position="absolute"
      bottom={0}>
      <XStack flex={1} justifyContent="center" gap={TAB_BAR_HEIGHT}>
        <TabBarBackground
          color={background.val}
          preserveAspectRatio="none"
          style={{ position: 'absolute' }}
        />
        <ButtonTabBar
          big
          placement="middle"
          icon={<LayoutGrid color={'$inversed'} size={'$5'} strokeWidth={1.25} />}
          onPress={() => router.push(MODALR.menu)}
        />
        <Button
          height={'100%'}
          flex={1}
          icon={<Home color={inversed.val} height={'50%'} opacity={tabIndex === 0 ? 1 : 0.75} />}
          onPress={() => navigation.navigate('home')}
        />
        <Button
          height={'100%'}
          flex={1}
          icon={<Profile color={inversed.val} height={'50%'} opacity={tabIndex === 1 ? 1 : 0.75} />}
          onPress={() => navigation.navigate('profile')}
        />
      </XStack>
      <View height={insetBottom} />
    </YStack>
  );
}
