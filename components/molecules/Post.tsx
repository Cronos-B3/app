import { Button, Image, SizableText, useTheme, XStack, YStack, YStackProps } from 'tamagui';
import { DEVICE } from '@/constants/config';
import Text from '../atoms/Text';
import { ArrowBigUp, Heart, MoreHorizontal, Share2 } from '@tamagui/lucide-icons';
import { PostType } from '@/constants/types';
import useTimer from '@/hooks/useTimer';
import moment from 'moment';
import usePostsStore from '@/hooks/store/usePostsStore';
import { Children, useState } from 'react';
import usePostsApi from '@/hooks/api/app/usePostApi';

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

  const [like, setLike] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [upvote, setUpvote] = useState(post.upvotes);
  const [isUpvoted, setIsUpvoted] = useState(post.isUpvoted);

  const { likePostApi, unlikePostApi, upVotePostApi, unUpVotePostApi } = usePostsApi();

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    setLike((prev) => (isLiked ? prev - 1 : prev + 1));
    isLiked ? unlikePostApi.process(post.id) : likePostApi.process(post.id);
  };

  const handleUpvote = () => {
    setIsUpvoted((prev) => !prev);
    setUpvote((prev) => (isUpvoted ? prev - 1 : prev + 1));
    isUpvoted ? unUpVotePostApi.process(post.id) : upVotePostApi.process(post.id);
  };

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
          <YStack justifyContent="center" alignItems="center" flexDirection="row">
            <Button
              onPress={handleLike}
              color={isLiked ? '$liked' : '$inversed'}
              icon={<Heart size={'$4'} strokeWidth={1.5} fill={isLiked ? liked.val : undefined} />}
            />

            <SizableText color={'white'} size="$4" marginLeft={8}>
              {like}
            </SizableText>
          </YStack>
          <YStack justifyContent="center" alignItems="center" flexDirection="row">
            <Button
              onPress={handleUpvote}
              color={isUpvoted ? '$primary' : '$inversed'}
              icon={
                <ArrowBigUp
                  size={'$5'}
                  strokeWidth={1}
                  fill={isUpvoted ? primary.val : undefined}
                />
              }
            />
            <SizableText color={'white'} size="$4">
              {upvote}
            </SizableText>
          </YStack>
        </XStack>
        <Button color={'$inversed'} icon={<Share2 size={'$4'} strokeWidth={1.5} />} />
      </XStack>
    </YStack>
  );
}
