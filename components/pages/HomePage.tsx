import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, YStack } from 'tamagui';
import PostsList from '../molecules/PostsList';
import { TAB_BAR_HEIGHT } from '../organisms/TabBar';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import useAppApi from '@/hooks/api/useAppApi';
import usePostsStore from '@/hooks/store/usePostsStore';
import { FlashList } from '@shopify/flash-list';
import { PostType } from '@/constants/types';
import { useToastController } from '@tamagui/toast';

export default function HomePage() {
  if (__DEV__) console.log('📃 - HomePage');

  const { top, bottom } = useSafeAreaInsets();
  const { getMyFeed } = useAppApi();
  const { posts, lastPostId } = usePostsStore();
  const toast = useToastController();

  const listRef = useRef<FlashList<PostType>>(null);

  const { data } = useQuery({
    queryKey: getMyFeed.queryKey,
    queryFn: getMyFeed.process,
  });

  useEffect(() => {
    if (!data) return;
    getMyFeed.onSuccess(data);
  }, [data]);

  const { data: upData, refetch: fetchUp } = useQuery({
    queryKey: getMyFeed.up.queryKey,
    queryFn: getMyFeed.up.process,
    enabled: false,
  });

  useEffect(() => {
    if (!upData) return;
    if (upData.length === 0) {
      toast.show('Vous êtes au cron le plus récent.');
      return;
    }
    getMyFeed.up.onSuccess(upData);
  }, [upData]);

  const { data: downData, refetch: fetchDown } = useQuery({
    queryKey: getMyFeed.down.queryKey,
    queryFn: getMyFeed.down.process,
    enabled: false,
  });

  useEffect(() => {
    if (!downData) return;
    if (downData.length === 0) {
      toast.show('Vous êtes au cron le plus vieux.');
      return;
    }
    getMyFeed.down.onSuccess(downData);

    console.log('downData', downData);
  }, [downData]);

  const onScroll = async (event) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;

    // Check if the user is at the top of the list and scrolling up
    if (currentOffsetY <= 0 && currentOffsetY < lastOffsetY) {
      await fetchUp();
      listRef.current?.scrollToItem({ item: posts[0], animated: false });
    }

    lastOffsetY = currentOffsetY;
  };

  return (
    <YStack flex={1} paddingBottom={bottom} marginTop={top}>
      <Stack flex={1} paddingHorizontal={'6%'}>
        <PostsList
          ref={listRef}
          data={posts}
          contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT * 2 }}
          onEndReached={() => {
            if (!lastPostId) return;
            fetchDown();
          }}
          onScroll={onScroll}
        />
      </Stack>
    </YStack>
  );
}
