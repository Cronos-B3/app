import { ReactNode } from 'react';
import { YStack, YStackProps } from 'tamagui';
import Text from '../atoms/Text';
import { DEVICE } from '@/constants/config';

type ProfileCategoryProps = {
  title: string;
  children?: ReactNode;
} & YStackProps;

export default function ProfileCategory({ title, children, ...props }: ProfileCategoryProps) {
  // if (__DEV__) console.log('🐙 - ProfileCategory');

  return (
    <YStack gap={DEVICE.height * 0.02} {...props}>
      <Text fontFamily={'$bold'} fontSize={'$6'}>
        {title}
      </Text>
      {children}
    </YStack>
  );
}
