import { DEVICE } from '@/constants/config';
import IMG from '@/constants/images';
import { Image, YStack } from 'tamagui';

type AuthHeaderProps = {
  top?: number;
};

export default function AuthHeader({ top = 0 }: AuthHeaderProps) {
  // if (__DEV__) console.log('🐙 - AuthHeader');

  return (
    <YStack
      height={top + DEVICE.height * 0.25}
      paddingTop={top}
      backgroundColor={'$not_inversed_background'}
      justifyContent="center"
      alignItems="center">
      <Image
        source={{ uri: IMG.logo }}
        height={'60%'}
        maxWidth={'60%'}
        aspectRatio={1}
        resizeMode="contain"
      />
    </YStack>
  );
}
