import Pressable from 'components/atoms/Pressable/Pressable';
import { gs } from 'constants/styles';
import { Redirect, router, Stack } from 'expo-router';
import { useTokenStore } from 'hooks/store/useTokenStore';

export default () => {
  const { token } = useTokenStore();

  if (!token) return <Redirect href="/a/login" />;

  return (
    <Pressable style={gs.flex} onPress={() => router.back()} pressedOpacity={1}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          presentation: 'transparentModal',
          animation: 'slide_from_bottom'
        }}
      >
        <Stack.Screen name="settings" />
        <Stack.Screen name="account" />
        <Stack.Screen name="create-post" />
        <Stack.Screen name="search" />
      </Stack>
    </Pressable>
  );
};
