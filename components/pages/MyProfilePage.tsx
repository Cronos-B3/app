import { Button, Image, ScrollView, Stack, XStack, YStack, YStackProps } from 'tamagui';
import Text from '../atoms/Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEVICE } from '@/constants/config';
import { UserType } from '@/constants/types';
import { Clipboard, Gem, MoreHorizontal } from '@tamagui/lucide-icons';
import { NamedExoticComponent, ReactNode } from 'react';
import type { IconProps } from '@tamagui/helpers-icon';
import { useTranslation } from 'react-i18next';
import formatFollowersNumber from '@/lib/formatFollowersNumber';

export default function MyProfilePage() {
  if (__DEV__) console.log('📃 - MyProfilePage');

  const { top } = useSafeAreaInsets();
  const { t } = useTranslation('app');

  const tempUser: UserType = {
    identifier: 'CezGain',
    username: 'CezGain',
    profilePicture:
      'https://ih1.redbubble.net/image.866593086.1888/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg',
    backgroundPicture:
      'https://img.freepik.com/photos-gratuite/peinture-lac-montagne-montagne-arriere-plan_188544-9126.jpg?w=1060&t=st=1718028586~exp=1718029186~hmac=a3cd39d48083fcd630e7df8f20d1abc25f1ec9185bbf06fad47aebc85688e20b',
    bio: 'Je suis la biographie',
    numFollowers: formatFollowersNumber(123),
  };

  return (
    <YStack marginTop={top}>
      <ScrollView contentContainerStyle={{ paddingBottom: DEVICE.height * 0.15 }}>
        <Image height={DEVICE.height * 0.2} source={{ uri: tempUser.backgroundPicture }} />
        <YStack paddingHorizontal={'4%'} gap={DEVICE.height * 0.035}>
          <YStack>
            <XStack height={DEVICE.height * 0.225} gap={DEVICE.width * 0.07} paddingVertical={'6%'}>
              <Image
                height={'70%'}
                aspectRatio={1}
                borderRadius={'$round'}
                source={{ uri: tempUser.profilePicture }}
              />
              <YStack flex={1} justifyContent="space-between">
                <YStack>
                  <Text>@{tempUser.identifier}</Text>
                  <Text fontSize={'$7'} fontFamily={'$bold'}>
                    {tempUser.username}
                  </Text>
                </YStack>
                <Text fontSize={'$4'}>
                  {t('followers', { numFollowers: tempUser.numFollowers })}
                </Text>
                <XStack
                  height={'28%'}
                  width={'100%'}
                  justifyContent="flex-end"
                  gap={DEVICE.width * 0.06}
                  paddingRight={'5%'}>
                  <Button
                    backgroundColor={'$primary'}
                    height={'100%'}
                    aspectRatio={3.75}
                    color={'$inversed'}
                    fontSize={'$4'}
                    borderRadius={'$3'}>
                    Suivre
                  </Button>
                  <Button
                    backgroundColor={'$primary'}
                    height={'100%'}
                    aspectRatio={1}
                    fontSize={'$4'}
                    borderRadius={'$3'}
                    icon={<MoreHorizontal color={'$inversed'} />}
                  />
                </XStack>
              </YStack>
            </XStack>
            <Text>{tempUser.bio}</Text>
          </YStack>
          <ProfileCategory title={t('stats')}>
            <YStack flex={1} gap={DEVICE.height * 0.02}>
              <StatsStack title={t('post')} Icon={Clipboard}></StatsStack>
              <StatsStack title={t('success')} Icon={Gem}></StatsStack>
            </YStack>
          </ProfileCategory>
          <ProfileCategory title={t('posts')}></ProfileCategory>
        </YStack>
      </ScrollView>
    </YStack>
  );
}

function ProfileCategory({
  title,
  children,
  ...props
}: { title: string; children?: ReactNode } & YStackProps) {
  return (
    <YStack gap={DEVICE.height * 0.02} {...props}>
      <Text fontFamily={'$bold'} fontSize={'$6'}>
        {title}
      </Text>
      {children}
    </YStack>
  );
}

function StatsStack({ title, Icon }: { title: string; Icon: NamedExoticComponent<IconProps> }) {
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
