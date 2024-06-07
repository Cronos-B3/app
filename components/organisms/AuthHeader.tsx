import { DEVICE } from '@/constants/config';
import IMG from '@/constants/images';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import { Keyboard } from 'react-native';
import { Button, Image, YStack } from 'tamagui';

type AuthHeaderProps = {
  top?: number;
};

export default function AuthHeader({ top = 0 }: AuthHeaderProps) {
  // if (__DEV__) console.log('🐙 - AuthHeader');

  return (
    <YStack
      height={top + DEVICE.height * 0.3}
      paddingTop={top}
      backgroundColor={'$not_inversed_background'}
      justifyContent="center"
      alignItems="center"
      onPress={() => Keyboard.dismiss()}>
      <Image
        source={{ uri: IMG.logo }}
        height={'50%'}
        maxWidth={'50%'}
        aspectRatio={1}
        resizeMode="contain"
      />
      {router.canGoBack() && (
        <Button
          color={'$inversed'}
          icon={<ArrowLeft size={'$6'} />}
          position="absolute"
          top={'50%'}
          left={'8%'}
          onPress={() => router.back()}
        />
      )}
    </YStack>
  );
}
