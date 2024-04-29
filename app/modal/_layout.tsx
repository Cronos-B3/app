import { Stack } from 'expo-router';

export default () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
        presentation: 'transparentModal',
        animation: 'slide_from_bottom'
      }}
    >
      <Stack.Screen name="settings" />
    </Stack>
  );
};
