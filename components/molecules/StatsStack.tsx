import { NamedExoticComponent } from 'react';
import type { IconProps } from '@tamagui/helpers-icon';
import { Stack, XStack, YStack } from 'tamagui';
import { DEVICE } from '@/constants/config';
import Text from '../atoms/Text';

type StatsStackProps = {
  title: string;
  Icon: NamedExoticComponent<IconProps>;
};

export default function StatsStack({ title, Icon }: StatsStackProps) {
  // if (__DEV__) console.log('🐙 - StatsStack');

  return (
    <YStack
      height={DEVICE.height * 0.12}
      padding={DEVICE.height * 0.0125}
      backgroundColor={'$overBackground'}
      borderRadius={'$3'}>
      <XStack height={DEVICE.height * 0.12 * 0.35} alignItems="center" gap={DEVICE.width * 0.03}>
        <Stack
          backgroundColor={'$primary'}
          height={'100%'}
          aspectRatio={1}
          borderRadius={'$2'}
          justifyContent="center"
          alignItems="center">
          <Icon size={'$3'} strokeWidth={1.5} color={'$inversed'} />
        </Stack>
        <Text fontFamily={'$bold'} fontSize={'$4'}>
          {title}
        </Text>
      </XStack>
      <XStack flex={1} gap={DEVICE.width * 0.02}></XStack>
    </YStack>
  );
}
