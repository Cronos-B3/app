import { Stack } from 'expo-router';

export default () => {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen options={{ headerBackButtonMenuEnabled: false }} name="login" />
    </Stack>
  );
};
