import { DEVICE } from '@/constants/config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { YStack } from 'tamagui';

export default function PostModal() {
  if (__DEV__) console.log('📃 - PostModal');

  const { bottom } = useSafeAreaInsets();

  return (
    <YStack
      height={DEVICE.height * 0.5 + bottom}
      backgroundColor={'yellow'}
      paddingBottom={bottom}></YStack>
  );
}
