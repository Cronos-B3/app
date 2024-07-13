import { Button, Image, useTheme, XStack, YStack, YStackProps } from 'tamagui';
import { DEVICE } from '@/constants/config';
import Text from '../atoms/Text';
import { Heart } from '@tamagui/lucide-icons';
import { PostType } from '@/constants/types';
import usePostsStore from '@/hooks/store/usePostsStore';
import usePostsApi from '@/hooks/api/app/usePostApi';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import { useState } from 'react';

type PostProps = {
  post: PostType;
} & YStackProps;

export default function Comment({ post, ...props }: PostProps) {
  // if (__DEV__) console.log('🐙 - Post');

  const { liked, primary } = useTheme();

  const { likePostApi, unlikePostApi } = usePostsApi();
  const { likePost, unlikePost } = usePostsStore();

  const [isLiked, setIsLiked] = useState(() => post.isLiked);
  const [likes, setLikes] = useState(() => post.likes);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    post.isLiked ? unlikePost(post.id) : likePost(post.id);
    post.isLiked ? unlikePostApi.process(post.id) : likePostApi.process(post.id);
  };

  return (
    <YStack gap={DEVICE.height * 0.0}>
      <XStack gap={DEVICE.width * 0.03} height={100}>
        <Image
          onPress={() => router.push('/' + post.userId)}
          source={{ uri: post.profilePicture }}
          width={DEVICE.width * 0.1}
          height={DEVICE.width * 0.1}
          borderRadius={50}
          marginTop={20}
        />
        <YStack gap={DEVICE.height * 0.01} width={DEVICE.width * 0.6}>
          <Text fontSize={'$2'}>{post.username}</Text>
          <Text fontSize={'$1'}>{post.content}</Text>
        </YStack>
        <YStack justifyContent="flex-end" alignItems="center" flexDirection="row">
          <Button
            onPress={handleLike}
            color={isLiked ? '$liked' : '$inversed'}
            icon={<Heart size={'$3'} strokeWidth={1.5} fill={isLiked ? liked.val : undefined} />}
          />
          <Text fontSize={'$1'} marginLeft={8}>
            {likes}
          </Text>
        </YStack>
      </XStack>
    </YStack>
  );
}
