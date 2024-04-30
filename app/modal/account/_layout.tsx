import { Stack } from 'expo-router';

export default () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
        presentation: 'transparentModal',
        animation: 'none'
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="change-password" />
    </Stack>
  );
};
