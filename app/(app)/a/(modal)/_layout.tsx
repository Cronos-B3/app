import { router, Stack } from 'expo-router';
import { YStack } from 'tamagui';

export default () => {
  return (
    <YStack flex={1} onPress={() => router.back()}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
          contentStyle: { backgroundColor: 'transparent', justifyContent: 'flex-end' },
        }}>
        <Stack.Screen name="menu" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="search" />
        <Stack.Screen name="post" />
      </Stack>
    </YStack>
  );
};
