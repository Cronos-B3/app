import { Button, Image, ScrollView, Spinner, Stack, XStack, YStack, YStackProps } from 'tamagui';
import Text from '../atoms/Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DEVICE } from '@/constants/config';
import { Clipboard, Gem, MoreHorizontal } from '@tamagui/lucide-icons';
import { NamedExoticComponent, ReactNode, useEffect } from 'react';
import type { IconProps } from '@tamagui/helpers-icon';
import { useTranslation } from 'react-i18next';
import formatFollowersNumber from '@/lib/formatFollowersNumber';
import { useQuery } from '@tanstack/react-query';
import useAppApi from '@/hooks/api/useAppApi';
import useUserStore from '@/hooks/store/useUserStore';
import usePostsStore from '@/hooks/store/usePostsStore';
import { TAB_BAR_HEIGHT } from '../organisms/TabBar';
import Post from '../molecules/Post';

export default function MyProfilePage() {
  if (__DEV__) console.log('📃 - MyProfilePage');

  const { top } = useSafeAreaInsets();
  const { t } = useTranslation('app');
  const { getMe } = useAppApi();

  const { user } = useUserStore();
  const { myPosts } = usePostsStore();

  // TODO: When I scroll up, a loader should appear at the top of the screen and reload the profile data.
  const { data, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: getMe.process,
  });

  useEffect(() => {
    if (!data) return;
    getMe.onSuccess(data);
  }, [data]);

  // TODO: Review this page and add the missing parts
  return (
    <YStack marginTop={top}>
      <ScrollView contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT * 2 }}>
        <Image height={DEVICE.height * 0.2} source={{ uri: user?.bannerPicture }} />
        <YStack paddingHorizontal={'4%'} gap={DEVICE.height * 0.035}>
          <YStack>
            <XStack height={DEVICE.height * 0.225} gap={DEVICE.width * 0.07} paddingVertical={'6%'}>
              <Image
                height={'70%'}
                aspectRatio={1}
                borderRadius={'$round'}
                source={{ uri: user?.profilePicture }}
              />
              <YStack flex={1} justifyContent="space-between">
                <YStack>
                  <Text>@{user?.identifier}</Text>
                  <Text fontSize={'$7'} fontFamily={'$bold'}>
                    {user?.username}
                  </Text>
                </YStack>
                <Text fontSize={'$4'}>{t('followers', { numFollowers: 'TO_CHANGE' })}</Text>
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
            <Text>{user?.bio}</Text>
          </YStack>
          <ProfileCategory title={t('stats')}>
            <YStack flex={1} gap={DEVICE.height * 0.02}>
              <StatsStack title={t('post')} Icon={Clipboard}></StatsStack>
              <StatsStack title={t('success')} Icon={Gem}></StatsStack>
            </YStack>
          </ProfileCategory>
          <ProfileCategory title={t('posts')}>
            {isLoading ? (
              // TODO: Add a post skeleton
              <Spinner size={'large'} alignSelf="center" />
            ) : myPosts.length === 0 ? (
              <Text fontFamily={'$bold'} fontSize={'$7'} alignSelf="center">
                {t('noPost')}
              </Text>
            ) : (
              <YStack paddingHorizontal={'2%'}>
                <Post
                  post={{
                    id: '45357375835732572',
                    username: 'CezGain',
                    profilePicture:
                      'https://ih1.redbubble.net/image.866593086.1888/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg',
                    content:
                      'Je suis une petite carotte de ma personne Je suis une petite carotte de ma mere la gentille personne Je suis une petite carotte de ma mere la gentille personne Je suis une petite carotte de ma mere la gentille personne Je suis une petite carotte de ma mere la gentille personne',
                    liked: true,
                    upvoted: true,
                    timeLeft: 1023456,
                  }}
                />
                <Post
                  post={{
                    id: '45357375835732572',
                    username: 'CezGain',
                    profilePicture:
                      'https://ih1.redbubble.net/image.866593086.1888/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg',
                    content:
                      'Je suis une petite carotte de ma personne Je suis une petite carotte de ma mere la gentille personne Je suis une petite carotte de ma mere la gentille personne Je suis une petite carotte de ma mere la gentille personne Je suis une petite carotte de ma mere la gentille personne',
                    liked: true,
                    upvoted: true,
                    timeLeft: 1023456,
                  }}
                />
                <Post
                  post={{
                    id: '45357375835732572',
                    username: 'CezGain',
                    profilePicture:
                      'https://ih1.redbubble.net/image.866593086.1888/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg',
                    content:
                      'Je suis une petite carotte de ma personne Je suis une petite carotte de ma mere la gentille personne Je suis une petite carotte de ma mere la gentille personne Je suis une petite carotte de ma mere la gentille personne Je suis une petite carotte de ma mere la gentille personne',
                    liked: true,
                    upvoted: true,
                    timeLeft: 1023456,
                  }}
                />
              </YStack>
            )}
          </ProfileCategory>
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
