import { Stack } from 'expo-router';

export default () => {
  return (
    <Stack
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="profile" />
    </Stack>
  );
};
