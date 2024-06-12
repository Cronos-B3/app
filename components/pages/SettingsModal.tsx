import { DEVICE } from '@/constants/config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { YStack } from 'tamagui';

export default function SettingsModal() {
  if (__DEV__) console.log('📃 - SettingsModal');

  const { bottom } = useSafeAreaInsets();

  return (
    <YStack
      height={DEVICE.height * 0.5 + bottom}
      backgroundColor={'red'}
      paddingBottom={bottom}></YStack>
  );
}
