import View from '@/components/atoms/View';
import { DEVICE } from '@/constants/config';
import IMG from '@/constants/images';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'tamagui';

export default () => {
  const { top } = useSafeAreaInsets();
  return (
    <>
      <View
        height={top + DEVICE.height * 0.3}
        paddingTop={top}
        backgroundColor={'$not_inversed_background'}
        centered>
        <Image
          source={{ uri: IMG.logo }}
          height={'50%'}
          maxWidth={'50%'}
          aspectRatio={1}
          resizeMode="contain"
        />
      </View>
      <Stack
        screenOptions={{
          animation: 'slide_from_right',
          headerShown: false,
        }}>
        <Stack.Screen name="login" />
      </Stack>
    </>
  );
};
