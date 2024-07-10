import { FlashList, FlashListProps } from '@shopify/flash-list';
import Post from './Post';
import { PostType } from '@/constants/types';
import { Stack, useTheme } from 'tamagui';
import { DEVICE } from '@/constants/config';
import { forwardRef } from 'react';

const PostsList = forwardRef<FlashList<PostType>, Omit<FlashListProps<PostType>, 'renderItem'>>(
  (props, ref) => {
    // if (__DEV__) console.log('🐙 - PostsList');

    const { inversed } = useTheme();

    return (
      <FlashList
        ref={ref}
        estimatedItemSize={DEVICE.height * 0.2}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        ItemSeparatorComponent={() => <Stack height={DEVICE.height * 0.025} />}
        {...props}
        renderItem={({ item }: { item: PostType }) => <Post key={item.id} post={item} />}
      />
    );
  }
);

export default PostsList;
