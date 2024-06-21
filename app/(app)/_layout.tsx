import { AUTHR } from '@/constants/routes';
import useTokenStore from '@/hooks/store/useTokenStore';
import { Redirect, Stack } from 'expo-router';
import { useTheme } from 'tamagui';

export default () => {
  const { notInversedBackground: background } = useTheme();

  const { token } = useTokenStore();

  if (!token) return <Redirect href={AUTHR.login} />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: background.val },
      }}>
      <Stack.Screen
        name="a/(modal)"
        options={{
          animation: 'none',
          presentation: 'transparentModal',
          contentStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        }}
      />
      <Stack.Screen name="a/(private)" />
      <Stack.Screen name="(public)" />
    </Stack>
  );
};
