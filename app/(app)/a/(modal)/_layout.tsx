import { router, Stack } from 'expo-router';
import { Stack as StackT } from 'tamagui';

export default () => {
  return (
    <StackT flex={1} onPress={() => router.back()}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_bottom',
          contentStyle: { backgroundColor: 'transparent', justifyContent: 'flex-end' },
        }}>
        <Stack.Screen name="menu" />
        <Stack.Screen name="settings/index" />
        <Stack.Screen name="settings/account" />
        <Stack.Screen name="settings/about" />
        <Stack.Screen name="settings/contact" />
        <Stack.Screen name="search" />
        <Stack.Screen name="post" />
      </Stack>
    </StackT>
  );
};
