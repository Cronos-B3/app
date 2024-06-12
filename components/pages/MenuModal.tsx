import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, YStack } from 'tamagui';
import { TAB_BAR_HEIGHT } from '../organisms/TabBar';
import { Search, Settings, SquarePen } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import ButtonTabBar from '../molecules/ButtonTabBar';
import { MODALR } from '@/constants/routes';

export default function MenuModal() {
  if (__DEV__) console.log('📃 - MenuModal');

  const { bottom } = useSafeAreaInsets();

  return (
    <YStack bottom={bottom} height={TAB_BAR_HEIGHT} width={'100%'}>
      <ButtonTabBar
        big
        placement="middle"
        icon={<SquarePen color={'$inversed'} size={'$5'} strokeWidth={1.5} />}
        onPress={() => router.replace(MODALR.post)}
      />
      <ButtonTabBar
        placement="left"
        icon={<Settings color={'$inversed'} size={'$4'} strokeWidth={1.5} />}
        onPress={() => router.replace(MODALR.settings)}
      />
      <ButtonTabBar
        placement="right"
        icon={<Search color={'$inversed'} size={'$4'} strokeWidth={1.5} />}
        onPress={() => router.replace(MODALR.search)}
      />
    </YStack>
  );
}
