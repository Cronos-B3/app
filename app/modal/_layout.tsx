import { Redirect, Stack } from 'expo-router';
import { useTokenStore } from 'hooks/store/useTokenStore';

export default () => {
  const { token } = useTokenStore();

  if (!token) return <Redirect href="/a/login" />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
        presentation: 'card',
        animation: 'slide_from_bottom'
      }}
    >
      <Stack.Screen name="settings" />
    </Stack>
  );
};
