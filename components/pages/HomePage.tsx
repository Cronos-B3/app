import { DEVICE } from '@/constants/config';
import { PostType } from '@/constants/types';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, useTheme, YStack } from 'tamagui';
import { TAB_BAR_HEIGHT } from '../organisms/TabBar';
import { ActivityIndicator } from 'react-native';
import Post from '../molecules/Post';

export default function HomePage() {
  if (__DEV__) console.log('📃 - HomePage');

  const { top, bottom } = useSafeAreaInsets();
  const { inversed } = useTheme();

  const tempPost: PostType = {
    id: '45357375835732572',
    username: 'CezGain',
    profilePicture:
      'https://ih1.redbubble.net/image.866593086.1888/flat,750x,075,f-pad,750x1000,f8f8f8.u4.jpg',
    content:
      'Je suis une petite carotte de ma personne Je suis une petite carotte de ma mere la gentille personne Je suis une petite carotte de ma mere la gentille personne Je suis une petite carotte de ma mere la gentille personne Je suis une petite carotte de ma mere la gentille personne',
    liked: true,
    upvoted: true,
    timeLeft: 1023456,
  };

  return (
    <YStack flex={1} paddingBottom={bottom} marginTop={top}>
      <Stack flex={1} paddingHorizontal={'6%'}>
        <FlashList
          data={[
            tempPost,
            tempPost,
            tempPost,
            tempPost,
            tempPost,
            tempPost,
            tempPost,
            tempPost,
            tempPost,
          ]}
          estimatedItemSize={DEVICE.height * 0.2}
          contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT * 2 }}
          showsVerticalScrollIndicator={false}
          onEndReached={() => console.log('end reached')}
          onEndReachedThreshold={0.2}
          ListFooterComponent={() => {
            // if loading return null (with tanstack)
            return <ActivityIndicator size={'large'} color={inversed.val} />;
          }}
          renderItem={({ item }: { item: PostType }) => <Post post={item} />}
        />
      </Stack>
    </YStack>
  );
}
