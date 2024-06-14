import { Button, Image, useTheme, XStack, YStack } from 'tamagui';
import { TAB_BAR_HEIGHT } from '../organisms/TabBar';
import { DEVICE } from '@/constants/config';
import Text from '../atoms/Text';
import { ArrowBigUp, Heart, MoreHorizontal, Share2 } from '@tamagui/lucide-icons';
import { PostType } from '@/constants/types';
import useTimer from '@/hooks/useTimer';

export default function Post({ post }: { post: PostType }) {
  // if (__DEV__) console.log('🐙 - Post');

  const { liked, primary } = useTheme();
  const { timeToString } = useTimer({
    time: post.timeLeft,
  });

  return (
    <YStack marginVertical={TAB_BAR_HEIGHT * 0.3} gap={DEVICE.height * 0.015}>
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
            color={post.liked ? '$liked' : '$inversed'}
            icon={<Heart size={'$4'} strokeWidth={1.5} fill={post.liked ? liked.val : undefined} />}
          />
          <Button
            color={post.liked ? '$primary' : '$inversed'}
            icon={
              <ArrowBigUp size={'$5'} strokeWidth={1} fill={post.liked ? primary.val : undefined} />
            }
          />
        </XStack>
        <Button color={'$inversed'} icon={<Share2 size={'$4'} strokeWidth={1.5} />} />
      </XStack>
    </YStack>
  );
}
