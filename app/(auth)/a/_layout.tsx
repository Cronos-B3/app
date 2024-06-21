import AuthHeader from '@/components/organisms/AuthHeader';
import { APPR } from '@/constants/routes';
import useTokenStore from '@/hooks/store/useTokenStore';
import { Redirect, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'tamagui';

export default () => {
  const { top } = useSafeAreaInsets();
  const { notInversedBackground: background } = useTheme();
  const { token } = useTokenStore();

  if (token) return <Redirect href={APPR.home} />;

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
        <Stack.Screen name="register" />
      </Stack>
    </>
  );
};
