import { Stack } from 'expo-router';

export default () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'none',
        contentStyle: { backgroundColor: 'transparent' },
      }}>
      <Stack.Screen name="menu" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="search" />
      <Stack.Screen name="post" />
    </Stack>
  );
};
