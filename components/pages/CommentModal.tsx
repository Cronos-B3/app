import { YStack } from 'tamagui';
import ModalTemplate from '../templates/ModalTemplate';
import { DEVICE } from '@/constants/config';
import { useTranslation } from 'react-i18next';
import { FlashList } from '@shopify/flash-list';
import { PostType } from '@/constants/types';
import { useRef } from 'react';
import usePostsStore from '@/hooks/store/usePostsStore';
import usePostsApi from '@/hooks/api/app/usePostApi';

export default function CommentModal() {
  if (__DEV__) console.log('📃 - CommentModal');

  const { t } = useTranslation();
  const listRef = useRef<FlashList<PostType>>(null);
  const { posts } = usePostsStore();
  const { getMyFeed } = usePostsApi();


  



  return (
    <ModalTemplate
      title={'Commentaires (12)'}
      justifyContent="space-between"
      bottomPadding
      height={DEVICE.height * 0.1}>
      <YStack gap={DEVICE.height * 0.08}></YStack>
    </ModalTemplate>
  );
}
