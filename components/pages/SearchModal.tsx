import { DEVICE } from '@/constants/config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { YStack } from 'tamagui';

export default function SearchModal() {
  if (__DEV__) console.log('📃 - SearchModal');

  const { bottom } = useSafeAreaInsets();

  return (
    <YStack
      height={DEVICE.height * 0.5 + bottom}
      backgroundColor={'green'}
      paddingBottom={bottom}></YStack>
  );
}
