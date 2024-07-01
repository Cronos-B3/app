import { Button, Image, useTheme, XStack, YStack, YStackProps } from 'tamagui';
import { DEVICE } from '@/constants/config';
import Text from '../atoms/Text';
import { ArrowBigUp, Heart, MoreHorizontal, Share2 } from '@tamagui/lucide-icons';
import { PostType } from '@/constants/types';
import useTimer from '@/hooks/useTimer';
import moment from 'moment';
import usePostsStore from '@/hooks/store/usePostsStore';

type PostProps = {
  post: PostType;
} & YStackProps;

export default function Post({ post, ...props }: PostProps) {
  // if (__DEV__) console.log('🐙 - Post');

  const { deletePost } = usePostsStore();
  const { liked, primary } = useTheme();
  const { timeToString } = useTimer({
    time: moment(post.finishedAt).diff(moment(), 'seconds') * 1000,
    onEnd: () => deletePost(post.id),
  });

  return (
    <YStack gap={DEVICE.height * 0.015} {...props}>
      <XStack height={DEVICE.height * 0.06} gap={DEVICE.width * 0.035} alignItems="center">
        <Image
          height={'100%'}
          aspectRatio={1}
          borderRadius={'$round'}
          source={{ uri: post.profilePicture }}
        />
        <YStack flex={1}>
          <Text fontSize={'$4'} fontFamily={'$bold'}>
            {post.username}
          </Text>
          <Text fontSize={'$2'}>{timeToString}</Text>
        </YStack>
        <Button color={'$inversed'} icon={<MoreHorizontal size={'$4'} strokeWidth={1.5} />} />
      </XStack>
      <Text fontSize={'$3'} numberOfLines={undefined}>
        {post.content}
      </Text>
      <XStack height={DEVICE.height * 0.05} alignItems="center" justifyContent="space-between">
        <XStack gap={DEVICE.width * 0.08}>
          <Button
            color={post.isLiked ? '$liked' : '$inversed'}
            icon={
              <Heart size={'$4'} strokeWidth={1.5} fill={post.isLiked ? liked.val : undefined} />
            }
          />
          <Button
            color={post.isUpvoted ? '$primary' : '$inversed'}
            icon={
              <ArrowBigUp
                size={'$5'}
                strokeWidth={1}
                fill={post.isUpvoted ? primary.val : undefined}
              />
            }
          />
        </XStack>
        <Button color={'$inversed'} icon={<Share2 size={'$4'} strokeWidth={1.5} />} />
      </XStack>
    </YStack>
  );
}
