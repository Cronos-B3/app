import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spinner, Stack, YStack } from 'tamagui';  // Assurez-vous d'inclure Spinner de Tamagui ou tout autre indicateur de chargement que vous préférez
import PostsList from '../molecules/PostsList';
import { TAB_BAR_HEIGHT } from '../organisms/TabBar';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import usePostsStore from '@/hooks/store/usePostsStore';
import { FlashList } from '@shopify/flash-list';
import { PostType } from '@/constants/types';
import { useToastController } from '@tamagui/toast';
import usePostsApi from '@/hooks/api/app/usePostApi';

export default function HomePage() {
  const { top, bottom } = useSafeAreaInsets();
  const { getMyFeed } = usePostsApi();
  const { posts, lastPostId } = usePostsStore();
  const toast = useToastController();
  const listRef = useRef<FlashList<PostType>>(null);
  let lastOffsetY = useRef(0).current;  // Utiliser useRef pour conserver la dernière position de défilement

  const {
    data,
    refetch: fetch,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: getMyFeed.queryKey,
    queryFn: getMyFeed.process,
  });

  useEffect(() => {
    if (!data) return;
    getMyFeed.onSuccess(data);
  }, [data]);

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

  

  const onScroll = async (event: any) => {
    const currentOffsetY = event.nativeEvent.contentOffset.y;
    if (currentOffsetY <= 0 && currentOffsetY < lastOffsetY) {
      await fetch();
      listRef.current?.scrollToItem({ item: posts[0], animated: false });
    }
    lastOffsetY = currentOffsetY;
  };

  return (
    <YStack flex={1} paddingBottom={bottom} marginTop={top}>
      {isFetching && (
        <Spinner size="large" />  // Afficher un spinner lors du chargement ou de la mise à jour des données
      )}
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
