import { DEVICE } from '@/constants/config';
import { Button, Image, ScrollView, Spinner, XStack, YStack } from 'tamagui';
import Text from '../atoms/Text';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { TAB_BAR_HEIGHT } from '../organisms/TabBar';
import { ArrowLeft, MoreHorizontal, X } from '@tamagui/lucide-icons';
import ProfileCategory from '../molecules/ProfileCategory';
import PostsList from '../molecules/PostsList';
import { OtherUserType, PostType, UserType } from '@/constants/types';
import { useQuery } from '@tanstack/react-query';
import usePostsStore from '@/hooks/store/usePostsStore';
import usePostsApi from '@/hooks/api/app/usePostApi';
import useFriendApi from '@/hooks/api/app/useFriendApi';
import { router } from 'expo-router';

type ProfileTemplateProps = {
  user: UserType | OtherUserType;
  me?: boolean;
};

export default function ProfileTemplate({ user, me }: ProfileTemplateProps) {
  // if (__DEV__) console.log('🐙 - ProfileTemplate');

  const { top } = useSafeAreaInsets();
  const { t } = useTranslation('app');
  const { myPosts } = usePostsStore();
  const { getMyPosts, getUserPosts } = usePostsApi();
  const [loading, setLoading] = useState(() => true);
  const [posts, setPosts] = useState<PostType[]>(() => []);
  const { follow, unfollow } = useFriendApi();

  const { data } = useQuery({
    queryKey: me ? getMyPosts.queryKey : [...getUserPosts.queryKey, user?.id],
    queryFn: () => {
      if (me) return getMyPosts.process();
      return getUserPosts.process(user?.id);
    },
  });
  console.log('🐙 - ProfileTemplate', user);
  const [isFollowing, setIsFollowing] = useState(() => user.isFollowing);
  const [followers, setFollowers] = useState(() => user.followers as number);

  console.log('🐙🐙🐙🐙 - data', followers);

  const handleFollow = () => {
    setIsFollowing((prev: boolean) => !prev);
    setFollowers((prev: number) => (isFollowing ? prev - 1 : prev + 1));
    isFollowing ? unfollow.process(user?.id as string) : follow.process(user?.id as string);
  };

  useEffect(() => {
    if (!data) return;
    if (me) {
      getMyPosts.onSuccess(data);
    } else {
      setPosts(data);
    }
    setLoading(false);
  }, [data]);

  if (loading) {
    return (
      <YStack marginTop={DEVICE.height *0.5}>
        <Spinner size={'large'} alignItems="center" justifyContent='center'/>
      </YStack>
    );
  } 

  return (
    <YStack marginTop={top}>
      <ScrollView contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT * 2 }}>
        <Image height={DEVICE.height * 0.2} source={{ uri: user?.bannerPicture }} />
        <Button
          icon={<ArrowLeft size={'$5'} strokeWidth={1.5} />}
          onPress={() => router.back()}
          backgroundColor={'transparent'}
          color={'$inversed'}
          position="absolute"
          top={DEVICE.height * 0.05}
          left={DEVICE.width * 0.03}
          
        />
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
                <Text fontSize={'$4'}>{t('followers', { numFollowers: followers })}</Text>
                <XStack
                  height={'28%'}
                  width={'100%'}
                  justifyContent="flex-end"
                  gap={DEVICE.width * 0.06}
                  paddingRight={'5%'}>
                  {!me && user && (
                    <Button
                      onPress={handleFollow}
                      backgroundColor={isFollowing ? 'transparent' : '$primary'}
                      height={'100%'}
                      aspectRatio={3.75}
                      color={isFollowing ? '$primary' : '$inversed'}
                      fontSize={'$4'}
                      borderRadius={'$3'}
                      borderWidth={isFollowing ? 2 : 0} // Ajoutez une bordure quand l'utilisateur suit déjà
                      borderColor={isFollowing ? '$primary' : 'transparent'} // Définissez la couleur de la bordure
                    >
                      {isFollowing ? t('unfollow') : t('follow')}
                    </Button>
                  )}
                  {me && (
                    <Button
                      backgroundColor={'$primary'}
                      height={'100%'}
                      aspectRatio={3.75}
                      color={'$inversed'}
                      fontSize={'$4'}
                      borderRadius={'$3'}
                      icon={<MoreHorizontal size={'$5'} strokeWidth={1.5} />}>
                      {t('edit')}
                    </Button>
                  )}
                </XStack>
              </YStack>
            </XStack>
            <Text numberOfLines={0}>{user?.bio}</Text>
          </YStack>
          {/* <ProfileCategory title={t('stats')}>
            <YStack flex={1} gap={DEVICE.height * 0.02}>
              <StatsStack title={t('post')} Icon={Clipboard}></StatsStack>
              <StatsStack title={t('success')} Icon={Gem}></StatsStack>
            </YStack>
          </ProfileCategory> */}
          <ProfileCategory title={t('posts')}>
            {loading ? (
              <Spinner size={'large'} alignSelf="center" />
            ) : (me && myPosts.length === 0) || (!me && posts.length === 0) ? (
              <Text fontFamily={'$bold'} fontSize={'$7'} alignSelf="center">
                {t('noPost')}
              </Text>
            ) : (
              <PostsList data={me ? myPosts : posts} />
            )}
          </ProfileCategory>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
