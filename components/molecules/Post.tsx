import { Button, Image, SizableText, useTheme, XStack, YStack, YStackProps } from 'tamagui';
import { DEVICE } from '@/constants/config';
import Text from '../atoms/Text';
import { ArrowBigUp, Heart, MessageCircle } from '@tamagui/lucide-icons';
import { PostType } from '@/constants/types';
import useTimer from '@/hooks/useTimer';
import moment from 'moment';
import usePostsStore from '@/hooks/store/usePostsStore';
import usePostsApi from '@/hooks/api/app/usePostApi';
import { router } from 'expo-router';
import { APPR, MODALR } from '@/constants/routes';
import useUserStore from '@/hooks/store/useUserStore';

type PostProps = {
  post: PostType;
} & YStackProps;

export default function Post({ post, ...props }: PostProps) {
  // if (__DEV__) console.log('🐙 - Post');
  const { user } = useUserStore();
  const { deletePost, likePost, unlikePost, upVotePost, unUpVotePost } = usePostsStore();
  const { liked, primary } = useTheme();
  const { timeToString } = useTimer({
    time: moment(post.finishedAt).diff(moment(), 'seconds') * 1000,
    onEnd: () => deletePost(post.id),
  });

  const { likePostApi, unlikePostApi, upVotePostApi, unUpVotePostApi } = usePostsApi();

  const handleLike = () => {
    post.isLiked ? unlikePost(post.id) : likePost(post.id);
    post.isLiked ? unlikePostApi.process(post.id) : likePostApi.process(post.id);
  };

  const handleUpvote = () => {
    console.log('upvote', post.id, post.isUpvoted, post.upvotes);
    post.isUpvoted ? unUpVotePost(post.id) : upVotePost(post.id);
    post.isUpvoted ? unUpVotePostApi.process(post.id) : upVotePostApi.process(post.id);
  };

  const navigateToComment = (id: string) => {
    router.push(MODALR.comment + id);
  };

  const navigateToPostComment = (id: string) => {
    router.push(MODALR.postComment + id);
  };

  const navigateToProfile = (id: string) => {
    if (id === user?.id) {
      router.push(APPR.myProfile);
    } else {
      router.push('/' + id);
    }
  };
  return (
    <YStack gap={DEVICE.height * 0.015} {...props} onPress={() => navigateToComment(post.id)}>
      <XStack height={DEVICE.height * 0.06} gap={DEVICE.width * 0.035} alignItems="center">
        <Image
          height={'100%'}
          aspectRatio={1}
          borderRadius={'$round'}
          source={{ uri: post.profilePicture }}
          onPress={() => navigateToProfile(post.userId)}
        />
        <YStack flex={1}>
          <Text fontSize={'$4'} fontFamily={'$bold'}>
            {post.username}
          </Text>
          <Text fontSize={'$2'}>{timeToString}</Text>
        </YStack>
        {/* <Button color={'$inversed'} icon={<MoreHorizontal size={'$4'} strokeWidth={1.5} />} /> */}
      </XStack>
      <Text fontSize={'$3'} numberOfLines={undefined}>
        {post.content}
      </Text>
      <XStack height={DEVICE.height * 0.05} alignItems="center" justifyContent="space-between">
        <XStack gap={DEVICE.width * 0.08}>
          <YStack justifyContent="center" alignItems="center" flexDirection="row">
            <Button
              onPress={handleLike}
              color={post.isLiked ? '$liked' : '$inversed'}
              icon={
                <Heart size={'$4'} strokeWidth={1.5} fill={post.isLiked ? liked.val : undefined} />
              }
            />

            <SizableText color={'white'} size="$4" marginLeft={8}>
              {post.likes}
            </SizableText>
          </YStack>
          <YStack justifyContent="center" alignItems="center" flexDirection="row">
            <Button
              onPress={handleUpvote}
              color={post.isUpvoted ? '$primary' : '$inversed'}
              icon={
                <ArrowBigUp
                  size={'$5'}
                  strokeWidth={1}
                  fill={post.isUpvoted ? primary.val : undefined}
                />
              }
            />
            <SizableText color={'white'} size="$4">
              {post.upvotes}
            </SizableText>
          </YStack>
          <YStack justifyContent="center" alignItems="center" flexDirection="row">
            <Button
              onPress={() => navigateToPostComment(post.id)}
              color={'$inversed'}
              icon={<MessageCircle size={'$4'} strokeWidth={1.5} fill={undefined} />}
            />
            <SizableText color={'white'} size="$4" marginLeft={8}>
              {/* {comment} */}
            </SizableText>
          </YStack>
        </XStack>
        {/* <Button
          color={'$inversed'}
          icon={<Share2 size={'$3'} strokeWidth={1.5} />}
        /> */}
      </XStack>
    </YStack>
  );
}
