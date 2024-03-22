import { Stack } from 'expo-router';

export default () => {
  return (
    <Stack
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0F0F0F' },
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="profile" />
    </Stack>
  );
};
