import {  Spinner, useTheme, View, XStack, YStack } from 'tamagui';
import ModalTemplate from '../templates/ModalTemplate';
import { DEVICE } from '@/constants/config';
import { useTranslation } from 'react-i18next';
import { FlashList } from '@shopify/flash-list';
import { PostType } from '@/constants/types';
import { useRef } from 'react';
import usePostsApi from '@/hooks/api/app/usePostApi';
import { useQuery } from '@tanstack/react-query';
import { useRoute } from '@react-navigation/native';
import CommentList from '../molecules/CommentList';

export default function CommentModal() {
  if (__DEV__) console.log('📃 - CommentModal');

  const { t } = useTranslation();
  const listRef = useRef<FlashList<PostType>>(null);
  const { liked, primary } = useTheme();

  const route = useRoute();
  const { id } = route.params as { id: string };

  const { getComments } = usePostsApi();

  const { data, isLoading } = useQuery({
    queryKey: getComments.queryKey,
    queryFn: () => getComments.process(id),
  });

  return (
    <ModalTemplate
      title={'Commentaires' + (data ? ` (${data.length})` : '')}
      justifyContent="space-between"
      bottomPadding
      height={70}>
      {isLoading && (
        <YStack marginTop={DEVICE.height * 0.5}>
          <Spinner size={'large'} alignItems="center" justifyContent="center" />
        </YStack>
      )}
      <CommentList ref={listRef} data={data} extraData={data} keyExtractor={(item) => item.id} />
    </ModalTemplate>
  );
}
