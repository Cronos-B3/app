import AuthHeader from '@/components/organisms/AuthHeader';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'tamagui';

export default () => {
  const { top } = useSafeAreaInsets();
  const { not_inversed_background: background } = useTheme();

  return (
    <>
      <AuthHeader top={top} />
      <Stack
        screenOptions={{
          animation: 'slide_from_right',
          headerShown: false,
          contentStyle: { backgroundColor: background.val },
        }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register/policies" />
        <Stack.Screen name="register/private-data" />
        <Stack.Screen name="register/public-data" />
      </Stack>
    </>
  );
};
